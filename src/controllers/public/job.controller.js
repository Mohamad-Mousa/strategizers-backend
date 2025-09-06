const asyncHandler = require("express-async-handler");
const ResponseService = require("../../services/core/response.service");
const JobService = require("../../services/public/job.service");

class JobController {
  constructor() {
    this.jobService = new JobService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const jobs = await this.jobService.findMany(req.query);
      ResponseService.success(res, "Success!", jobs, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const job = await this.jobService.findOne(req.params.slug);
      ResponseService.success(res, "Success!", job, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  apply = asyncHandler(async (req, res) => {
    try {
      const job = await this.jobService.apply(req.body, req.file);
      ResponseService.success(res, "Success!", job, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = JobController;
