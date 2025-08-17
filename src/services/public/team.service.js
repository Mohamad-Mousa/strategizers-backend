const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class TeamService extends BaseService {
  constructor() {
    super();
    this.Team = this.models.Team;
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
          { "name.en": { $regex: new RegExp(regexSearch, "i") } },
          { "name.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "position.en": { $regex: new RegExp(regexSearch, "i") } },
          { "position.ar": { $regex: new RegExp(regexSearch, "i") } },
          { email: { $regex: new RegExp(regexSearch, "i") } },
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

    let result = await this.Team.aggregate([
      { $match: query },
      ...pipes,
      {
        $project: {
          _id: 1,
          name: 1,
          position: 1,
          image: 1,
          description: 1,
          phone: 1,
          email: 1,
          social: 1,
          createdAt: 1,
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
    const team = await this.Team.findOne({
      _id: id,
      isActive: true,
    });
    if (!team) {
      throw new CustomError("Team member not found", 404);
    }
    return { team };
  }
}

module.exports = TeamService;
