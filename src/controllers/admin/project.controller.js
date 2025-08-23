const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ProjectService = require("../../services/admin/project.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class ProjectController {
  constructor() {
    this.projectService = new ProjectService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const projects = await this.projectService.findMany(req.query);
      ResponseService.success(res, "Success!", projects, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const project = await this.projectService.findOne(req.params.id);
      ResponseService.success(res, "Success!", project, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const project = await this.projectService.create(req.body, req.files);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.projects,
        "Project Created."
      );
      ResponseService.success(res, "Success!", project, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.projectService.update(req.body, req.files);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.projects,
        "Project Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.projectService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.projects,
        "Project Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ProjectController;
