const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const PartnerService = require("../../services/admin/partner.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class PartnerController {
  constructor() {
    this.partnerService = new PartnerService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const partners = await this.partnerService.findMany(req.query);
      ResponseService.success(res, "Success!", partners, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const partner = await this.partnerService.findOne(req.params.id);
      ResponseService.success(res, "Success!", partner, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const partner = await this.partnerService.create(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.partners,
        "Partner Created."
      );
      ResponseService.success(res, "Success!", partner, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.partnerService.update(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.partners,
        "Partner Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.partnerService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.partners,
        "Partner Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = PartnerController;
