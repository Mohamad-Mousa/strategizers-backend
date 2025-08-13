const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ServiceService = require("../../services/public/service.service");

class ServiceController {
  constructor() {
    this.serviceService = new ServiceService();
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
      const service = await this.serviceService.findOne(req.params.slug);
      ResponseService.success(res, "Success!", service, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ServiceController;
