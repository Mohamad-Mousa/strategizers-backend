const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ProgramCategoryService = require("../../services/public/program_category.service");

class ProgramCategoryController {
  constructor() {
    this.service = new ProgramCategoryService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const categories = await this.service.findMany(req.query);
      ResponseService.success(res, "Success!", categories, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const category = await this.service.findOne(req.params.id);
      ResponseService.success(res, "Success!", category, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ProgramCategoryController;
