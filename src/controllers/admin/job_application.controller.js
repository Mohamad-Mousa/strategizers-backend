const asyncHandler = require("express-async-handler");
const ResponseService = require("../../services/core/response.service");
const JobApplicationService = require("../../services/admin/job_application.service");

class JobApplicationController {
  constructor() {
    this.jobApplicationService = new JobApplicationService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const jobApplications = await this.jobApplicationService.findMany(
        req.query
      );
      ResponseService.success(res, "Success!", jobApplications, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const jobApplication = await this.jobApplicationService.findOne(
        req.params.id
      );
      ResponseService.success(res, "Success!", jobApplication, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      const { jobApplication } = await this.jobApplicationService.update(
        req.body
      );
      ResponseService.success(res, "Success!", jobApplication, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.jobApplicationService.delete(req.params.ids);
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = JobApplicationController;
