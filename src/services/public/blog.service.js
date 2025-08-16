const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class BlogService extends BaseService {
  constructor() {
    super();
    this.Blog = this.models.Blog;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      isActive: true,
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
        $project: {
          _id: 1,
          title: 1,
          subTitle: 1,
          description: 1,
          image: 1,
          author: 1,
          tags: 1,
          service: 1,
          createdAt: 1,
          slug: 1,
        },
      },
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

  async findOne(slug) {
    const blog = await this.Blog.findOne({
      slug,
      isActive: true,
    }).populate("service");
    if (!blog) {
      throw new CustomError("Blog not found", 404);
    }
    return { blog };
  }
}

module.exports = BlogService;
