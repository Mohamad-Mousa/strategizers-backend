const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const ProposalService = require("../../services/admin/proposal.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class ProposalController {
  constructor() {
    this.proposalService = new ProposalService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const proposals = await this.proposalService.findMany(req.query);
      ResponseService.success(res, "Success!", proposals, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const proposal = await this.proposalService.findOne(req.params.id);
      ResponseService.success(res, "Success!", proposal, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.proposalService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.proposals,
        "Proposal Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = ProposalController;
