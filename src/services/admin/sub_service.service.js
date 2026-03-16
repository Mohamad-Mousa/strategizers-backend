const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class SubServiceService extends BaseService {
  constructor() {
    super();
    this.SubService = this.models.SubService;
    this.bodyValidationService = BodyValidationService;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      isDeleted: false,
      ...(req_query.service && { service: this.ObjectId(req_query.service) }),
      ...(req_query.term && {
        $or: [
          { "title.en": { $regex: new RegExp(regexSearch, "i") } },
          { "title.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "outcome.en": { $regex: new RegExp(regexSearch, "i") } },
          { "outcome.ar": { $regex: new RegExp(regexSearch, "i") } },
          {
            "oneLineValuePromise.en": {
              $regex: new RegExp(regexSearch, "i"),
            },
          },
          {
            "oneLineValuePromise.ar": {
              $regex: new RegExp(regexSearch, "i"),
            },
          },
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
    pipes.push({
      $lookup: {
        from: "services",
        localField: "service",
        foreignField: "_id",
        as: "serviceDoc",
      },
    });
    pipes.push({
      $unwind: { path: "$serviceDoc", preserveNullAndEmptyArrays: true },
    });
    pipes.push({
      $addFields: {
        serviceTitle: "$serviceDoc.title",
      },
    });
    pipes.push({
      $project: { serviceDoc: 0 },
    });
    let result = await this.SubService.aggregate([
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
    const subService = await this.SubService.findOne({
      _id: id,
      isDeleted: false,
    }).populate("service", "title slug");
    if (!subService) {
      throw new CustomError("Sub-service not found", 404);
    }
    return { subService };
  }

  async create(body) {
    this.bodyValidationService.validateRequiredFields(body, [
      "title.en",
      "title.ar",
      "outcome.en",
      "outcome.ar",
      "oneLineValuePromise.en",
      "oneLineValuePromise.ar",
      "service",
    ]);
    body.slug = StringFormatter.slugify(body.title.en);

    const existingSubService = await this.SubService.findOne({
      slug: body.slug,
      isDeleted: false,
    });
    if (existingSubService) {
      throw new CustomError("Sub-service with this title already exists", 400);
    }
    body.strategicIssuesWeResolve = body.strategicIssuesWeResolve || [];
    body.whatYouGet = body.whatYouGet || [];
    const subService = await this.SubService.create(body);
    return { subService };
  }

  async update(body) {
    if (body.title) {
      body.slug = StringFormatter.slugify(body.title.en);
      const existingSubService = await this.SubService.findOne({
        slug: body.slug,
        isDeleted: false,
        _id: { $ne: body._id },
      });
      if (existingSubService) {
        throw new CustomError(
          "Sub-service with this title already exists",
          400,
        );
      }
    }
    const subService = await this.SubService.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      { new: true, runValidators: true },
    );
    if (!subService) {
      throw new CustomError("Sub-service not found", 404);
    }
    return { subService };
  }

  async delete(ids) {
    ids = ids.split(",");
    await this.SubService.updateMany(
      { _id: { $in: ids } },
      { isDeleted: true },
    );
  }
}

module.exports = SubServiceService;
