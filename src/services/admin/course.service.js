const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class CourseService extends BaseService {
  constructor() {
    super();
    this.Course = this.models.Course;
    this.ProgramCategory = this.models.ProgramCategory;
    this.bodyValidationService = BodyValidationService;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";

    let query = {
      isDeleted: false,
      ...(req_query.term && {
        $or: [
          { "title.en": { $regex: new RegExp(regexSearch, "i") } },
          { "title.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "shortDescription.en": { $regex: new RegExp(regexSearch, "i") } },
          { "shortDescription.ar": { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.programCategory && {
        programCategory: this.ObjectId(req_query.programCategory),
      }),
      ...(req_query.isActive !== undefined && {
        isActive: req_query.isActive === "true",
      }),
    };

    let pipes = [];
    if (req_query.sortBy) {
      let dir = 1;
      if (req_query.sortDirection == "desc") dir = -1;
      let key = req_query.sortBy;
      pipes.push({ $sort: { [key]: dir } });
    } else {
      pipes.push({ $sort: { createdAt: -1 } });
    }

    let result = await this.Course.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "programcategories",
          localField: "programCategory",
          foreignField: "_id",
          as: "programCategory",
        },
      },
      {
        $unwind: { path: "$programCategory", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          title: 1,
          shortDescription: 1,
          longDescription: 1,
          image: 1,
          slug: 1,
          programCategory: 1,
          isActive: 1,
          isDeleted: 1,
          createdAt: 1,
        },
      },
      ...pipes,
      {
        $facet: {
          data: [
            { $skip: req_query.page ? (req_query.page - 1) * limit : 0 },
            { $limit: limit },
          ],
          totalCount: [{ $count: "total" }],
        },
      },
    ]);

    let data = result[0].data;
    let totalCount = result[0].totalCount[0]
      ? result[0].totalCount[0].total
      : 0;
    return { data, totalCount };
  }

  async findOne(id) {
    const course = await this.Course.findOne({
      _id: this.ObjectId(id),
      isDeleted: false,
    }).populate("programCategory");
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    return { course };
  }

  async create(body, file) {
    this.bodyValidationService.validateRequiredFields(body, [
      "title.en",
      "title.ar",
      "shortDescription.en",
      "shortDescription.ar",
      "longDescription.en",
      "longDescription.ar",
      "programCategory",
    ]);

    if (file) {
      body.image = file.filename;
    }

    if (!body.image) {
      throw new CustomError("Image is required", 400);
    }

    body.slug = StringFormatter.slugify(body.title.en || body.title.ar);

    const exists = await this.Course.findOne({
      slug: body.slug,
      isDeleted: false,
    });
    if (exists) {
      throw new CustomError("Slug already exists", 400);
    }

    const course = await this.Course.create(body);
    return { course };
  }

  async update(body, file) {
    if (file) {
      body.image = file.filename;
    }

    if (!body._id) {
      throw new CustomError("Course ID is required", 400);
    }

    if (body.title && (body.title.en || body.title.ar)) {
      body.slug = StringFormatter.slugify(body.title.en || body.title.ar);
      const exists = await this.Course.findOne({
        slug: body.slug,
        _id: { $ne: this.ObjectId(body._id) },
        isDeleted: false,
      });
      if (exists) {
        throw new CustomError("Slug already exists", 400);
      }
    }

    await this.Course.updateOne({ _id: this.ObjectId(body._id) }, body);
  }

  async delete(ids) {
    ids = ids.split(",");
    await this.Course.updateMany({ _id: { $in: ids } }, { isDeleted: true });
  }
}

module.exports = CourseService;
