const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");

class FAQService extends BaseService {
  constructor() {
    super();
    this.FAQ = this.models.FAQ;
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
          { "question.en": { $regex: new RegExp(regexSearch, "i") } },
          { "question.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "answer.en": { $regex: new RegExp(regexSearch, "i") } },
          { "answer.ar": { $regex: new RegExp(regexSearch, "i") } },
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
    let result = await this.FAQ.aggregate([
      { $match: query },
      ...pipes,
      {
        $project: {
          _id: 1,
          question: 1,
          answer: 1,
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
}

module.exports = FAQService;
