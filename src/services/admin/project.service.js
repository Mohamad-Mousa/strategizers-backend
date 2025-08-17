const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");

class ProjectService extends BaseService {
  constructor() {
    super();
    this.Project = this.models.Project;
    this.Service = this.models.Service;
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
          { "title.en": { $regex: new RegExp(regexSearch, "i") } },
          { "title.ar": { $regex: new RegExp(regexSearch, "i") } },
          { "shortDescription.en": { $regex: new RegExp(regexSearch, "i") } },
          { "shortDescription.ar": { $regex: new RegExp(regexSearch, "i") } },
          { customer: { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.service && {
        service: this.ObjectId(req_query.service),
      }),
      ...(req_query.tags && {
        tags: { $in: req_query.tags.split(",") },
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

    let result = await this.Project.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "services",
          localField: "service",
          foreignField: "_id",
          as: "service",
        },
      },
      { $unwind: { path: "$service", preserveNullAndEmptyArrays: true } },
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
    const project = await this.Project.findOne({
      _id: id,
    }).populate("service");
    if (!project) {
      throw new CustomError("Project not found", 404);
    }
    return { project };
  }

  async create(body, file) {
    this.bodyValidationService.validateRequiredFields(body, [
      "title.en",
      "title.ar",
      "shortDescription.en",
      "shortDescription.ar",
      "slug",
      "service",
      "customer",
      "date",
    ]);

    if (file) {
      body.image = file.filename;
    }

    if (!body.image) {
      throw new CustomError("Image is required", 400);
    }

    const existingProject = await this.Project.findOne({ slug: body.slug });
    if (existingProject) {
      throw new CustomError("Slug already exists", 400);
    }

    if (body.service) {
      const service = await this.Service.findOne({
        _id: body.service,
        isActive: true,
      });
      if (!service) {
        throw new CustomError("Service not found or not active", 404);
      }
    }

    const project = await this.Project.create(body);
    return { project };
  }

  async update(body, file) {
    this.bodyValidationService.validateRequiredFields(body, ["_id"]);

    if (file) {
      body.image = file.filename;
    }

    const existingProject = await this.Project.findOne({
      slug: body.slug,
      _id: { $ne: body._id },
    });
    if (existingProject) {
      throw new CustomError("Slug already exists", 400);
    }

    if (body.service) {
      const service = await this.Service.findOne({
        _id: body.service,
        isActive: true,
      });
      if (!service) {
        throw new CustomError("Service not found or not active", 404);
      }
    }

    const project = await this.Project.findByIdAndUpdate(body._id, body, {
      new: true,
    });
    if (!project) {
      throw new CustomError("Project not found", 404);
    }
  }

  async delete(ids) {
    const idArray = ids.split(",");
    const result = await this.Project.deleteMany({
      _id: { $in: idArray },
    });
    if (result.deletedCount === 0) {
      throw new CustomError("No projects found to delete", 404);
    }
  }
}

module.exports = ProjectService;
