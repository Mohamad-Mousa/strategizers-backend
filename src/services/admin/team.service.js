const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class TeamService extends BaseService {
  constructor() {
    super();
    this.Team = this.models.Team;
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
          { "name.en": { $regex: new RegExp(regexSearch, "i") } },
          { "name.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "position.en": { $regex: new RegExp(regexSearch, "i") } },
          { "position.ar": { $regex: new RegExp(regexSearch, "i") } },
          { email: { $regex: new RegExp(regexSearch, "i") } },
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

    let result = await this.Team.aggregate([
      { $match: query },
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
    const team = await this.Team.findOne({
      _id: id,
    });
    if (!team) {
      throw new CustomError("Team member not found", 404);
    }
    return { team };
  }

  async create(body, file) {
    this.bodyValidationService.validateRequiredFields(body, [
      "name.en",
      "name.ar",
      "position.en",
      "position.ar",
    ]);

    if (file) {
      body.image = file.filename;
    }

    if (!body.image) {
      throw new CustomError("Image is required", 400);
    }

    // Validate email format if provided
    if (body.email && !this.isValidEmail(body.email)) {
      throw new CustomError("Invalid email format", 400);
    }

    // Validate phone number if provided
    if (body.phone) {
      if (!body.phone.code || !body.phone.number) {
        throw new CustomError("Phone code and number are required", 400);
      }
    }

    const team = await this.Team.create(body);
    return { team };
  }

  async update(body, file) {
    this.bodyValidationService.validateRequiredFields(body, ["_id"]);

    if (file) {
      body.image = file.filename;
    }

    // Validate email format if provided
    if (body.email && !this.isValidEmail(body.email)) {
      throw new CustomError("Invalid email format", 400);
    }

    // Validate phone number if provided
    if (body.phone) {
      if (!body.phone.code || !body.phone.number) {
        throw new CustomError("Phone code and number are required", 400);
      }
    }

    const team = await this.Team.findByIdAndUpdate(body._id, body, {
      new: true,
    });
    if (!team) {
      throw new CustomError("Team member not found", 404);
    }
  }

  async delete(ids) {
    const idArray = ids.split(",");
    const result = await this.Team.deleteMany({
      _id: { $in: idArray },
    });
    if (result.deletedCount === 0) {
      throw new CustomError("No team members found to delete", 404);
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = TeamService;
