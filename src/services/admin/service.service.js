const bcrypt = require("bcryptjs");
const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const handleUploadService = require("../core/handle_uploads.service");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class ServiceService extends BaseService {
  constructor() {
    super();
    this.Service = this.models.Service;
    this.handleUploadService = handleUploadService;
    this.bodyValidationService = BodyValidationService;
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
    let result = await this.Service.aggregate([
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
    const service = await this.Service.findOne({ _id: id, isDeleted: false });
    if (!service) {
      throw new CustomError("Service not found", 404);
    }
    return { service };
  }

  async create(body, files) {
    this.bodyValidationService.validateRequiredFields(body, [
      "title.en",
      "title.ar",
      "shortDescription.en",
      "shortDescription.ar",
      "longDescription.en",
      "longDescription.ar",
      "benefits.description.en",
      "benefits.description.ar",
    ]);
    body = this.handleUploadService.handleFileUploads(body, files);
    body.slug = StringFormatter.slugify(body.title.en);

    if (!body.banner) {
      throw new CustomError("Banner is required", 400);
    }
    if (!body.image) {
      throw new CustomError("Image is required", 400);
    }
    if (body.subServices.length === 0) {
      throw new CustomError("Sub Services are required", 400);
    }
    if (body.benefits.features.length === 0) {
      throw new CustomError("Benefits features are required", 400);
    }

    const existingService = await this.Service.findOne({
      slug: body.slug,
      isDeleted: false,
    });
    if (existingService) {
      throw new CustomError("Service with this title already exists", 400);
    }
    const service = await this.Service.create(body);
    return { service };
  }

  async update(body, files) {
    body = this.handleUploadService.handleFileUploads(body, files);
    if (body.title) {
      body.slug = StringFormatter.slugify(body.title.en);

      const existingService = await this.Service.findOne({
        slug: body.slug,
        isDeleted: false,
        _id: { $ne: body._id },
      });

      if (existingService) {
        throw new CustomError("Service with this title already exists", 400);
      }
    }
    const service = await this.Service.findOneAndUpdate(
      {
        _id: body._id,
        isDeleted: false,
      },
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!service) {
      throw new CustomError("Service not found", 404);
    }

    return { service };
  }

  async delete(ids) {
    ids = ids.split(",");
    await this.Service.updateMany({ _id: { $in: ids } }, { isDeleted: true });
  }
}

module.exports = ServiceService;
