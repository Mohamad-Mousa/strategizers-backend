const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ServiceService = require("../../services/admin/service.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class ServiceController {
  constructor() {
    this.serviceService = new ServiceService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const services = await this.serviceService.findMany(req.query);
      ResponseService.success(res, "Success!", services, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const service = await this.serviceService.findOne(req.params.id);
      ResponseService.success(res, "Success!", service, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const service = await this.serviceService.create(req.body, req.files);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.services,
        "Service Created."
      );
      ResponseService.success(res, "Success!", service, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.serviceService.update(req.body, req.files);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.services,
        "Service Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      const service = await this.serviceService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.services,
        "Service Deleted."
      );
      ResponseService.success(res, "Success!", service, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ServiceController;
