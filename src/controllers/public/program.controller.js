const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ProgramService = require("../../services/public/program.service");

class ProgramController {
  constructor() {
    this.programService = new ProgramService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const programs = await this.programService.findMany(req.query);
      ResponseService.success(res, "Success!", programs, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const program = await this.programService.findOne(req.params.id);
      ResponseService.success(res, "Success!", program, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ProgramController;
