const asyncHandler = require("express-async-handler");
const ResponseService = require("../../services/core/response.service");
const JobService = require("../../services/admin/job.service");

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
      const job = await this.jobService.findOne(req.params.id);
      ResponseService.success(res, "Success!", job, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const { job } = await this.jobService.create(req.body, req.file);
      ResponseService.success(res, "Success!", job, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      const { job } = await this.jobService.update(req.body, req.file);
      ResponseService.success(res, "Success!", job, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.jobService.delete(req.params.ids);
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = JobController;
