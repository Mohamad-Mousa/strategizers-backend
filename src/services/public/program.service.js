const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class ProgramService extends BaseService {
  constructor() {
    super();
    this.Program = this.models.Program;
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

    let result = await this.Program.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "programcategories",
          let: { programId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$program", "$$programId"] },
                    { $eq: ["$isDeleted", false] },
                    { $eq: ["$isActive", true] },
                  ],
                },
              },
            },
            { $project: { _id: 1, title: 1, createdAt: 1 } },
            {
              $lookup: {
                from: "courses",
                let: { categoryId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$programCategory", "$$categoryId"] },
                          { $eq: ["$isDeleted", false] },
                          { $eq: ["$isActive", true] },
                        ],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      title: 1,
                      image: 1,
                      slug: 1,
                      createdAt: 1,
                    },
                  },
                ],
                as: "courses",
              },
            },
          ],
          as: "categories",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          image: 1,
          categories: 1,
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
    const result = await this.Program.aggregate([
      {
        $match: {
          _id: this.ObjectId(id),
          isDeleted: false,
          isActive: true,
        },
      },
      {
        $lookup: {
          from: "programcategories",
          let: { programId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$program", "$$programId"] },
                    { $eq: ["$isDeleted", false] },
                    { $eq: ["$isActive", true] },
                  ],
                },
              },
            },
            { $project: { _id: 1, title: 1, createdAt: 1 } },
            {
              $lookup: {
                from: "courses",
                let: { categoryId: "$_id" },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$programCategory", "$$categoryId"] },
                          { $eq: ["$isDeleted", false] },
                          { $eq: ["$isActive", true] },
                        ],
                      },
                    },
                  },
                  {
                    $project: {
                      _id: 1,
                      title: 1,
                      image: 1,
                      slug: 1,
                      createdAt: 1,
                    },
                  },
                ],
                as: "courses",
              },
            },
          ],
          as: "categories",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          image: 1,
          categories: 1,
          createdAt: 1,
        },
      },
    ]);

    const program = result[0];
    if (!program) {
      throw new CustomError("Program not found", 404);
    }
    return { program };
  }
}

module.exports = ProgramService;
