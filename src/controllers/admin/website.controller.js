const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const WebsiteService = require("../../services/admin/website.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class WebsiteController {
  constructor() {
    this.websiteService = new WebsiteService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const website = await this.websiteService.findMany();
      ResponseService.success(res, "Success!", website, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      console.log(req.body);

      await this.websiteService.update(req.body, req.files);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.website,
        "Website Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = WebsiteController;
