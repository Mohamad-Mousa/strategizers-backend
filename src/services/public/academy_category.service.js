const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class AcademyCategoryService extends BaseService {
  constructor() {
    super();
    this.AcademyCategory = this.models.AcademyCategory;
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
        ],
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

    let result = await this.AcademyCategory.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "courses",
          let: { categoryId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$academyCategory", "$$categoryId"] },
                isDeleted: false,
                isActive: true,
              },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                programOverview: 1,
                programDuration: 1,
                image: 1,
                slug: 1,
              },
            },
            { $sort: { createdAt: -1 } },
          ],
          as: "courses",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          createdAt: 1,
          courses: 1,
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
    const result = await this.AcademyCategory.aggregate([
      {
        $match: {
          _id: this.ObjectId(id),
          isDeleted: false,
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "courses",
          let: { categoryId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$academyCategory", "$$categoryId"] },
                isDeleted: false,
                isActive: true,
              },
            },
            {
              $project: {
                _id: 1,
                title: 1,
                programOverview: 1,
                programDuration: 1,
                image: 1,
                slug: 1,
              },
            },
            { $sort: { createdAt: -1 } },
          ],
          as: "courses",
        },
      },
      { $limit: 1 },
    ]);
    const category = result[0];
    if (!category) {
      throw new CustomError("Academy category not found", 404);
    }
    return { category };
  }
}

module.exports = AcademyCategoryService;
