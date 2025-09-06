const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ProposalService = require("../../services/public/proposal.service");

class ProposalController {
  constructor() {
    this.proposalService = new ProposalService();
  }

  create = asyncHandler(async (req, res) => {
    try {
      const proposal = await this.proposalService.create(req.body, req.file);
      ResponseService.success(res, "Success!", proposal, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ProposalController;
