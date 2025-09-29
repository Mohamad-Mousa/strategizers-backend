const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ProgramCategoryService = require("../../services/admin/program_category.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class ProgramCategoryController {
  constructor() {
    this.programCategoryService = new ProgramCategoryService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const categories = await this.programCategoryService.findMany(req.query);
      ResponseService.success(res, "Success!", categories, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const category = await this.programCategoryService.findOne(req.params.id);
      ResponseService.success(res, "Success!", category, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const category = await this.programCategoryService.create(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Created a program category."
      );
      ResponseService.success(res, "Success!", category, 201);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.programCategoryService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Updated a program category."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.programCategoryService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Deleted a program category."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ProgramCategoryController;
