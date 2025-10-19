const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class BlogService extends BaseService {
  constructor() {
    super();
    this.Blog = this.models.Blog;
    this.bodyValidationService = BodyValidationService;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      ...(req_query.term && {
        $or: [
          { "title.en": { $regex: new RegExp(regexSearch, "i") } },
          { "title.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "subTitle.en": { $regex: new RegExp(regexSearch, "i") } },
          { "subTitle.ar": { $regex: new RegExp(regexSearch, "i") } },
          { author: { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.service && {
        service: this.ObjectId(req_query.service),
      }),
      ...(req_query.tags && {
        tags: { $in: req_query.tags.split(",") },
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

    let result = await this.Blog.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: { path: "$service", preserveNullAndEmptyArrays: true } },
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
    const blog = await this.Blog.findOne({
      _id: id,
    }).populate("service");
    if (!blog) {
      throw new CustomError("Blog not found", 404);
    }
    return { blog };
  }

  async create(body, file) {
    this.bodyValidationService.validateRequiredFields(body, [
      "title.en",
      "title.ar",
      "subTitle.en",
      "subTitle.ar",
      "description.en",
      "description.ar",
    ]);

    if (file) {
      body.image = file.filename;
    }

    if (!body.image) {
      throw new CustomError("Image is required", 400);
    }

    body.slug = StringFormatter.slugify(body.title.en);

    const existingBlog = await this.Blog.findOne({ slug: body.slug });
    if (existingBlog) {
      throw new CustomError("Blog with this title already exists", 400);
    }

    const blog = await this.Blog.create(body);
    return { blog };
  }

  async update(body, file) {
    if (file) {
      body.image = file.filename;
    }

    if (body.title && body.title.en) {
      body.slug = StringFormatter.slugify(body.title.en);

      const existingBlog = await this.Blog.findOne({
        slug: body.slug,
        _id: { $ne: body._id },
      });

      if (existingBlog) {
        throw new CustomError("Blog with this title already exists", 400);
      }
    }

    const blog = await this.Blog.findByIdAndUpdate(body._id, {
      ...body,
    });
    return { blog };
  }

  async delete(ids) {
    const idArray = ids.split(",");
    await this.Blog.deleteMany({
      _id: { $in: idArray },
    });
  }
}

module.exports = BlogService;
