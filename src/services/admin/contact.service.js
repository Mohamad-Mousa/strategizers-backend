const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class ContactService extends BaseService {
  constructor() {
    super();
    this.Contact = this.models.Contact;
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
          { fullName: { $regex: new RegExp(regexSearch, "i") } },
          { email: { $regex: new RegExp(regexSearch, "i") } },
          { subject: { $regex: new RegExp(regexSearch, "i") } },
          { "phone.code": { $regex: new RegExp(regexSearch, "i") } },
          { "phone.number": { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.isRead !== undefined && {
        isRead: req_query.isRead === "true",
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

    let result = await this.Contact.aggregate([
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
    const contact = await this.Contact.findOne({
      _id: id,
    });
    if (!contact) {
      throw new CustomError("Contact not found", 404);
    }
    return { contact };
  }

  async update(body) {
    this.bodyValidationService.validateRequiredFields(body, ["_id"]);

    const contact = await this.Contact.findByIdAndUpdate(body._id, {
      ...(body.isRead !== undefined && { isRead: body.isRead }),
    });
    return { contact };
  }

  async delete(ids) {
    const idArray = ids.split(",");
    await this.Contact.deleteMany({
      _id: { $in: idArray },
    });
  }
}

module.exports = ContactService;
