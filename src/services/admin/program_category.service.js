const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class ProgramCategoryService extends BaseService {
  constructor() {
    super();
    this.ProgramCategory = this.models.ProgramCategory;
    this.Program = this.models.Program;
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
        ],
      }),
      ...(req_query.program && { program: this.ObjectId(req_query.program) }),
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

    let result = await this.ProgramCategory.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "programs",
          let: { programId: "$program" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$_id", "$$programId"] },
                    { $eq: ["$isDeleted", false] },
                    { $eq: ["$isActive", true] },
                  ],
                },
              },
            },
          ],
          as: "programData",
        },
      },
      {
        $unwind: { path: "$programData", preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          program: "$programData",
        },
      },
      ...pipes,
      {
        $project: {
          title: 1,
          program: 1,
          isActive: 1,
          isDeleted: 1,
          createdAt: 1,
          updatedAt: 1,
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

  async findOne(id) {
    const category = await this.ProgramCategory.findOne({
      _id: this.ObjectId(id),
      isDeleted: false,
    }).populate("program");
    if (!category) {
      throw new CustomError("Category not found", 404);
    }
    return { category };
  }

  async create(body) {
    if (!body.title || (!body.title.en && !body.title.ar)) {
      throw new CustomError("Title is required in at least one language", 400);
    }
    if (!body.program) {
      throw new CustomError("Program is required", 400);
    }

    const program = await this.Program.findOne({
      _id: this.ObjectId(body.program),
      isDeleted: false,
    });
    if (!program) {
      throw new CustomError("Program not found", 404);
    }

    const category = await this.ProgramCategory.create(body);
    return { category };
  }

  async update(body) {
    if (!body._id) {
      throw new CustomError("Category ID is required", 400);
    }

    const existing = await this.ProgramCategory.findOne({
      _id: this.ObjectId(body._id),
      isDeleted: false,
    });
    if (!existing) {
      throw new CustomError("Category not found", 404);
    }

    if (body.program) {
      const program = await this.Program.findOne({
        _id: this.ObjectId(body.program),
        isDeleted: false,
      });
      if (!program) {
        throw new CustomError("Program not found", 404);
      }
    }

    await this.ProgramCategory.updateOne(
      { _id: this.ObjectId(body._id) },
      body
    );
  }

  async delete(ids) {
    ids = ids.split(",");
    await this.ProgramCategory.updateMany(
      { _id: { $in: ids } },
      { isDeleted: true }
    );
  }
}

module.exports = ProgramCategoryService;
