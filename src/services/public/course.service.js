const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class CourseService extends BaseService {
  constructor() {
    super();
    this.Course = this.models.Course;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";

    let query = {
      isDeleted: false,
      isActive: true,
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
        $project: {
          _id: 1,
          title: 1,
          shortDescription: 1,
          image: 1,
          slug: 1,
          programCategory: 1,
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

  async findOne(slug) {
    const course = await this.Course.findOne({
      slug,
      isDeleted: false,
      isActive: true,
    }).populate("programCategory");
    if (!course) {
      throw new CustomError("Course not found", 404);
    }
    return { course };
  }
}

module.exports = CourseService;
