const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const TeamService = require("../../services/public/team.service");

class TeamController {
  constructor() {
    this.teamService = new TeamService();
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
}

module.exports = TeamController;
