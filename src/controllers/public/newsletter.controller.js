const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const NewsletterService = require("../../services/public/newsletter.service");

class NewsletterController {
  constructor() {
    this.newsletterService = new NewsletterService();
  }

  create = asyncHandler(async (req, res) => {
    try {
      await this.newsletterService.create(req.body);
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.newsletterService.delete(req.params.email);
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = NewsletterController;
