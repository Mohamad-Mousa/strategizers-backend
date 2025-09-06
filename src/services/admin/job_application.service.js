const BaseService = require("../core/base.service");
const CustomError = require("../core/custom_error.service");
const StringFormatter = require("../core/string_formatter");

class JobApplicationService extends BaseService {
  constructor() {
    super();
    this.JobApplication = this.models.JobApplication;
    this.Job = this.models.Job;
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      ...(req_query.term && {
        $or: [
          { firstName: { $regex: new RegExp(regexSearch, "i") } },
          { lastName: { $regex: new RegExp(regexSearch, "i") } },
          { email: { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.job && { job: this.ObjectId(req_query.job) }),
      ...(req_query.gender && { gender: req_query.gender }),
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
    let result = await this.JobApplication.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $unwind: {
          path: "$job",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          gender: 1,
          dob: 1,
          message: 1,
          document: 1,
          job: 1,
          job: {
            title: 1,
            type: 1,
          },
          createdAt: 1,
          updatedAt: 1,
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
    const jobApplication = await this.JobApplication.findById(id).populate({
      path: "job",
      select: "title type description responsibilities requirements",
    });
    if (!jobApplication)
      throw new CustomError("Job application not found", 404);
    return { jobApplication };
  }

  async update(body) {
    if (!body._id) throw new CustomError("Job application ID is required", 400);

    const jobApplication = await this.JobApplication.findOneAndUpdate(
      { _id: body._id },
      {
        isRead: body.isRead || false,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!jobApplication)
      throw new CustomError("Job application not found", 404);
    return { jobApplication };
  }

  async delete(ids) {
    const array = ids.split(",").map((id) => id.trim());
    await this.JobApplication.deleteMany({ _id: { $in: array } });
  }
}

module.exports = JobApplicationService;
