const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const FAQService = require("../../services/public/faq.service");

class FAQController {
  constructor() {
    this.faqService = new FAQService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const faqs = await this.faqService.findMany(req.query);
      ResponseService.success(res, "Success!", faqs, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = FAQController;
