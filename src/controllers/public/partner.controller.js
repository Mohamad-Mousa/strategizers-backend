const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const PartnerService = require("../../services/public/partner.service");

class PartnerController {
  constructor() {
    this.partnerService = new PartnerService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const partners = await this.partnerService.findMany(req.query);
      ResponseService.success(res, "Success!", partners, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = PartnerController;
