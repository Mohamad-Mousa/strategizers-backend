const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const SubServiceService = require("../../services/admin/sub_service.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class SubServiceController {
  constructor() {
    this.subServiceService = new SubServiceService();
    this.UserLogService = new UserLogService();
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
      const result = await this.subServiceService.findOne(req.params.id);
      ResponseService.success(res, "Success!", result, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const result = await this.subServiceService.create(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.subServices,
        "Sub-service created.",
      );
      ResponseService.success(res, "Success!", result, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.subServiceService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.subServices,
        "Sub-service updated.",
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.subServiceService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.subServices,
        "Sub-service deleted.",
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = SubServiceController;
