const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");
const handleUploadService = require("../core/handle_uploads.service");

class PartnerService extends BaseService {
  constructor() {
    super();
    this.Partner = this.models.Partner;
    this.bodyValidationService = BodyValidationService;
    this.handleUploadService = handleUploadService;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
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
    let result = await this.Partner.aggregate([
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
    const partner = await this.Partner.findOne({
      _id: id,
    });
    if (!partner) {
      throw new CustomError("Partner not found", 404);
    }
    return { partner };
  }

  async create(body, file) {
    this.bodyValidationService.validateRequiredFields(body, [
      "title.en",
      "title.ar",
    ]);

    if (file) {
      body.image = file.filename;
    }

    if (!body.image) {
      throw new CustomError("Image is required", 400);
    }

    const partner = await this.Partner.create(body);
    return { partner };
  }

  async update(body, file) {
    if (file) {
      body.image = file.filename;
    }

    const partner = await this.Partner.findByIdAndUpdate(body._id, {
      ...body,
    });
    return { partner };
  }

  async delete(ids) {
    const idArray = ids.split(",");
    await this.Partner.deleteMany({
      _id: { $in: idArray },
    });
  }
}

module.exports = PartnerService;
