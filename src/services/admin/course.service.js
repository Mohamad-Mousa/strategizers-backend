const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");
const qs = require("qs");

class CourseService extends BaseService {
  constructor() {
    super();
    this.Course = this.models.Course;
    this.AcademyCategory = this.models.AcademyCategory;
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
          { "programOverview.en": { $regex: new RegExp(regexSearch, "i") } },
          { "programOverview.ar": { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.academyCategory && {
        academyCategory: this.ObjectId(req_query.academyCategory),
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
          from: "academycategories",
          localField: "academyCategory",
          foreignField: "_id",
          as: "academyCategory",
        },
      },
      {
        $unwind: { path: "$academyCategory", preserveNullAndEmptyArrays: true },
      },
      {
        $project: {
          title: 1,
          programOverview: 1,
          programObjectives: 1,
          targetAudience: 1,
          expectedOrganizationalBenefits: 1,
          programDuration: 1,
          programDurationDetails: 1,
          deliveryFormat: 1,
          programMethodology: 1,
          programOutline: 1,
          samplePracticalActivities: 1,
          image: 1,
          slug: 1,
          academyCategory: 1,
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
    }).populate("academyCategory");
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    return { course };
  }

  async create(body, file) {
    body = this._parseCourseBody(body);

    this.bodyValidationService.validateRequiredFields(body, [
      "title.en",
      "title.ar",
      "programOverview.en",
      "programOverview.ar",
      "academyCategory",
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

    body = this._parseCourseBody(body);
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

  _parseCourseBody(body) {
    const hasFlatKeys = Object.keys(body).some((k) =>
      typeof k === "string" && k.includes("[")
    );
    if (hasFlatKeys) {
      const flatEntries = Object.entries(body)
        .filter(
          ([k, v]) =>
            typeof k === "string" &&
            typeof v === "string" &&
            v !== "" &&
            k !== "image"
        )
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&");
      body = qs.parse(flatEntries) || body;
    }
    const arrayFields = [
      "programObjectives",
      "targetAudience",
      "expectedOrganizationalBenefits",
      "deliveryFormat",
      "programMethodology",
      "samplePracticalActivities",
    ];
    for (const field of arrayFields) {
      if (body[field] !== undefined && typeof body[field] === "string") {
        try {
          body[field] = JSON.parse(body[field]) || [];
        } catch {
          body[field] = [];
        }
      }
      if (body[field] && !Array.isArray(body[field])) {
        body[field] = Object.keys(body[field])
          .sort((a, b) => Number(a) - Number(b))
          .map((i) => body[field][i])
          .filter(Boolean);
      }
    }
    if (body.programOutline !== undefined && typeof body.programOutline === "string") {
      try {
        body.programOutline = JSON.parse(body.programOutline) || [];
      } catch {
        body.programOutline = [];
      }
    }
    if (body.programOutline && !Array.isArray(body.programOutline)) {
      body.programOutline = Object.keys(body.programOutline)
        .sort((a, b) => Number(a) - Number(b))
        .map((i) => body.programOutline[i])
        .filter(Boolean);
    }
    return body;
  }

  async delete(ids) {
    ids = ids.split(",");
    await this.Course.updateMany({ _id: { $in: ids } }, { isDeleted: true });
  }
}

module.exports = CourseService;
