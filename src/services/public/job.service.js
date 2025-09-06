const BaseService = require("../core/base.service");
const CustomError = require("../core/custom_error.service");
const StringFormatter = require("../core/string_formatter");
const BodyValidationService = require("../core/body_validation.service");

class JobService extends BaseService {
  constructor() {
    super();
    this.Job = this.models.Job;
    this.JobApplication = this.models.JobApplication;
    this.bodyValidationService = BodyValidationService;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      isActive: true,
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
          slug: 1,
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

  async findOne(slug) {
    const job = await this.Job.findOne({
      slug: slug,
      isActive: true,
      isDeleted: false,
    });
    if (!job) {
      throw new CustomError("Job not found", 404);
    }
    return job;
  }

  async apply(body, file) {
    this.bodyValidationService.validateRequiredFields(body, [
      "firstName",
      "lastName",
      "email",
      "phone",
      "gender",
      "dob",
      "message",
      "job",
    ]);
    if (file) {
      body.document = file.filename;
    } else {
      throw new CustomError("Document is required", 400);
    }

    const job = await this.Job.findOne({
      _id: body.job,
      isActive: true,
      isDeleted: false,
    });
    if (!job) {
      throw new CustomError("Job not found", 404);
    }

    await this.JobApplication.create({
      ...body,
      job: job._id,
    });
  }
}

module.exports = JobService;
