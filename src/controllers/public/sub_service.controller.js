const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const SubServiceService = require("../../services/public/sub_service.service");

class SubServiceController {
  constructor() {
    this.subServiceService = new SubServiceService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const result = await this.subServiceService.findMany(req.query);
      ResponseService.success(res, "Success!", result, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const result = await this.subServiceService.findOne(req.params.slug);
      ResponseService.success(res, "Success!", result, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = SubServiceController;
