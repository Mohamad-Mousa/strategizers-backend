const BaseService = require("../core/base.service");
const CustomError = require("../core/custom_error.service");
const StringFormatter = require("../core/string_formatter");
const HandleUploadService = require("../core/handle_uploads.service");
const BodyValidationService = require("../core/body_validation.service");

class JobService extends BaseService {
  constructor() {
    super();
    this.Job = this.models.Job;
    this.handleUploadService = HandleUploadService;
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
          { title: { $regex: new RegExp(regexSearch, "i") } },
          { description: { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.type && { type: req_query.type }),
    };
    let pipes = [];
    if (req_query.sortBy) {
      let dir = 1;
      if (req_query.sortDirection === "desc") dir = -1;
      let key = req_query.sortBy;
      pipes.push({ $sort: { [key]: dir } });
    } else {
      pipes.push({ $sort: { createdAt: -1 } });
    }
    let result = await this.Job.aggregate([
      { $match: query },
      {
        $project: {
          title: 1,
          description: 1,
          image: 1,
          type: 1,
          responsibilities: 1,
          requirements: 1,
          isActive: 1,
          createdAt: 1,
        },
      },
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
    const job = await this.Job.findOne({
      _id: id,
      isActive: true,
      isDeleted: false,
    });
    if (!job) throw new CustomError("Job not found", 404);
    return job;
  }

  async create(body, file) {
    this.bodyValidationService.validateRequiredFields(body, [
      "title",
      "description",
      "type",
      "responsibilities",
      "requirements",
    ]);

    if (file) {
      body.image = file.filename;
    } else {
      throw new CustomError("Image is required", 400);
    }

    body.slug = StringFormatter.slugify(body.title);

    const existingJob = await this.Job.findOne({
      slug: body.slug,
      isDeleted: false,
    });
    if (existingJob) throw new CustomError("Title already exists", 400);

    const job = await this.Job.create(body);
    return { job };
  }

  async update(body, file) {
    if (!body._id) throw new CustomError("Job ID is required", 400);

    if (file) {
      body.image = file.filename;
    }
    if (body.title) {
      body.slug = StringFormatter.slugify(body.title);

      const existingJob = await this.Job.findOne({
        slug: body.slug,
        isDeleted: false,
        _id: { $ne: body._id },
      });
      if (existingJob) throw new CustomError("Title already exists", 400);
    }

    const job = await this.Job.findOneAndUpdate(
      { _id: body._id, isDeleted: false },
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!job) throw new CustomError("Job not found", 404);
    return { job };
  }

  async delete(ids) {
    const array = ids.split(",").map((id) => id.trim());
    await this.Job.updateMany(
      { _id: { $in: array } },
      { isDeleted: true, isActive: false }
    );
  }
}

module.exports = JobService;
