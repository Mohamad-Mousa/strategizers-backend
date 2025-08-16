const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const FAQService = require("../../services/admin/faq.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class FAQController {
  constructor() {
    this.faqService = new FAQService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const faqs = await this.faqService.findMany(req.query);
      ResponseService.success(res, "Success!", faqs, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const faq = await this.faqService.findOne(req.params.id);
      ResponseService.success(res, "Success!", faq, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const faq = await this.faqService.create(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.faqs,
        "FAQ Created."
      );
      ResponseService.success(res, "Success!", faq, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.faqService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.faqs,
        "FAQ Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.faqService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.faqs,
        "FAQ Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = FAQController;
