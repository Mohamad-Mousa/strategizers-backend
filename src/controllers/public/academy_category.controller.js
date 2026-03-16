const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const AcademyCategoryService = require("../../services/public/academy_category.service");

class AcademyCategoryController {
  constructor() {
    this.service = new AcademyCategoryService();
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

module.exports = AcademyCategoryController;
