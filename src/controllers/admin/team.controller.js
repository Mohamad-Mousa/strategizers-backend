const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const TeamService = require("../../services/admin/team.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class TeamController {
  constructor() {
    this.teamService = new TeamService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const teams = await this.teamService.findMany(req.query);
      ResponseService.success(res, "Success!", teams, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const team = await this.teamService.findOne(req.params.id);
      ResponseService.success(res, "Success!", team, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const team = await this.teamService.create(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.teams,
        "Team Member Created."
      );
      ResponseService.success(res, "Success!", team, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.teamService.update(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.teams,
        "Team Member Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.teamService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.teams,
        "Team Member Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = TeamController;
