const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const handleUploadService = require("../core/handle_uploads.service");
const CustomError = require("../core/custom_error.service");

class ProgramService extends BaseService {
  constructor() {
    super();
    this.Program = this.models.Program;
    this.handleUploadService = handleUploadService;
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

    let result = await this.Program.aggregate([
      { $match: query },
      {
        $project: {
          title: 1,
          image: 1,
          isActive: 1,
          isDeleted: 1,
          createdAt: 1,
          updatedAt: 1,
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
    const program = await this.Program.findOne({
      _id: this.ObjectId(id),
      isDeleted: false,
    });
    if (!program) {
      throw new CustomError("Program not found", 404);
    }
    return { program };
  }

  async create(body, file) {
    if (file) {
      body.image = file.filename;
    }

    if (!body.image) {
      throw new CustomError("Image is required", 400);
    }

    if (!body.title || (!body.title.en && !body.title.ar)) {
      throw new CustomError("Title is required in at least one language", 400);
    }

    const program = await this.Program.create(body);
    return { program };
  }

  async update(body, file) {
    if (file) {
      body.image = file.filename;
    }

    if (!body._id) {
      throw new CustomError("Program ID is required", 400);
    }

    const existingProgram = await this.Program.findOne({
      _id: this.ObjectId(body._id),
      isDeleted: false,
    });

    if (!existingProgram) {
      throw new CustomError("Program not found", 404);
    }

    await this.Program.updateOne({ _id: this.ObjectId(body._id) }, body);
  }

  async delete(ids) {
    ids = ids.split(",");
    await this.Program.updateMany({ _id: { $in: ids } }, { isDeleted: true });
  }
}

module.exports = ProgramService;
