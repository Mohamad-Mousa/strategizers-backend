const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const NewsletterService = require("../../services/admin/newsletter.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class NewsletterController {
  constructor() {
    this.newsletterService = new NewsletterService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const newsletters = await this.newsletterService.findMany(req.query);
      ResponseService.success(res, "Success!", newsletters, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const newsletter = await this.newsletterService.findOne(req.params.id);
      ResponseService.success(res, "Success!", newsletter, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      await this.newsletterService.create(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.newsletters,
        "Newsletter Broadcasted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.newsletterService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.newsletters,
        "Newsletter Subscription Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = NewsletterController;
