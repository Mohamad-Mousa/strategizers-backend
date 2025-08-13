const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const WebsiteService = require("../../services/public/website.service");

class WebsiteController {
  constructor() {
    this.websiteService = new WebsiteService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const website = await this.websiteService.findMany();
      ResponseService.success(res, "Success!", website, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = WebsiteController;
