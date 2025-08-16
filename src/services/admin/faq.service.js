const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class FAQService extends BaseService {
  constructor() {
    super();
    this.FAQ = this.models.FAQ;
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
    const faq = await this.FAQ.findOne({
      _id: id,
    });
    if (!faq) {
      throw new CustomError("FAQ not found", 404);
    }
    return { faq };
  }

  async create(body) {
    this.bodyValidationService.validateRequiredFields(body, [
      "question.en",
      "question.ar",
      "answer.en",
      "answer.ar",
    ]);

    const faq = await this.FAQ.create(body);
    return { faq };
  }

  async update(body) {
    const faq = await this.FAQ.findByIdAndUpdate(body._id, {
      ...body,
    });
    return { faq };
  }

  async delete(ids) {
    const idArray = ids.split(",");
    await this.FAQ.deleteMany({
      _id: { $in: idArray },
    });
  }
}

module.exports = FAQService;
