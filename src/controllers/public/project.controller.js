const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ProjectService = require("../../services/public/project.service");

class ProjectController {
  constructor() {
    this.projectService = new ProjectService();
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
      const project = await this.projectService.findOne(req.params.slug);
      ResponseService.success(res, "Success!", project, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ProjectController;
