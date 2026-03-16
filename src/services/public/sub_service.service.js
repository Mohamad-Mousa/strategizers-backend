const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class SubServiceService extends BaseService {
  constructor() {
    super();
    this.SubService = this.models.SubService;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      isDeleted: false,
      isActive: true,
      ...(req_query.service && { service: this.ObjectId(req_query.service) }),
      ...(req_query.term && {
        $or: [
          { "title.en": { $regex: new RegExp(regexSearch, "i") } },
          { "title.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "outcome.en": { $regex: new RegExp(regexSearch, "i") } },
          { "outcome.ar": { $regex: new RegExp(regexSearch, "i") } },
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
      pipes.push({ $sort: { createdAt: 1 } });
    }
    let result = await this.SubService.aggregate([
      { $match: query },
      ...pipes,
      {
        $project: {
          _id: 1,
          title: 1,
          outcome: 1,
          oneLineValuePromise: 1,
          slug: 1,
          icon: 1,
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
    const subService = await this.SubService.findOne({
      slug,
      isDeleted: false,
      isActive: true,
    }).populate("service", "title slug");
    if (!subService) {
      throw new CustomError("Sub-service not found", 404);
    }
    return { subService };
  }
}

module.exports = SubServiceService;
