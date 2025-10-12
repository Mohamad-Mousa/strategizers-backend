const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const SeoService = require("../../services/admin/seo.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class SeoController {
  constructor() {
    this.seoService = new SeoService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const seo = await this.seoService.findMany();
      ResponseService.success(res, "Success!", seo, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.seoService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.seo,
        "SEO Configuration Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = SeoController;
