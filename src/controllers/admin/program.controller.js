const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ProgramService = require("../../services/admin/program.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class ProgramController {
  constructor() {
    this.programService = new ProgramService();
    this.UserLogService = new UserLogService();
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

  create = asyncHandler(async (req, res) => {
    try {
      const program = await this.programService.create(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Created a new program."
      );
      ResponseService.success(res, "Success!", program, 201);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.programService.update(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Updated a program."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.programService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Deleted a program."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ProgramController;
