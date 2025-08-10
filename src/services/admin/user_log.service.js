const BaseService = require("../core/base.service");

class UserLogService extends BaseService {
  constructor() {
    super();
    this.UserLog = this.models.UserLog;
  }

  async findMany(user_id, req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      // ...(req_query.term && { "user": { $regex: new RegExp(regexSearch, "i") } }),
    };
    let pipes = [];
    if (req_query.sortBy) {
      let dir = 1;
      if (req_query.sortDirection == "desc") dir = -1;
      let key = req_query.sortBy;
      pipes.push({ $sort: { [key]: dir } });
    }
    let result = await this.UserLog.aggregate([
      { $match: { user: this.ObjectId(user_id) } },
      {
        $lookup: {
          from: "users",
          let: { userId: "$user" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
            {
              $project: {
                _id: 0,
                fullName: { $concat: ["$firstName", " ", "$lastName"] },
              },
            },
          ],
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      { $addFields: { user: "$user.fullName" } },
      { $match: query },
      ...pipes,
      {
        $facet: {
          data: [
            { $skip: req_query.page ? (req_query.page - 1) * limit : 0 },
            { $limit: limit },
          ],
          metadata: [
            {
              $group: {
                _id: null,
                totalCount: { $sum: 1 },
                user: { $first: "$user" },
              },
            },
            {
              $project: {
                _id: 0,
                totalCount: 1,
                user: 1,
              },
            },
          ],
        },
      },
    ]);
    let data = result[0].data;
    let metadata = result[0].metadata[0];
    let totalCount = metadata ? metadata.totalCount : 0;
    let user = metadata ? metadata.user : undefined;
    return { data, metadata: { totalCount, user } };
  }

  async create(user_id, action, table, description) {
    const userLog = await this.UserLog({
      user: user_id,
      action: action.toLowerCase(),
      table,
      description,
    }).save();
  }
}

module.exports = UserLogService;
