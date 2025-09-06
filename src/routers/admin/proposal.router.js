let express = require("express");
const ProposalController = require("../../controllers/admin/proposal.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class ProposalRouter {
  constructor() {
    this.proposalController = new ProposalController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.proposals));

    router.get("", this.proposalController.findMany);
    router.get("/:id", this.proposalController.findOne);
    router.put("/update", this.proposalController.update);

    app.use("/proposal", router);
  }
}

module.exports = ProposalRouter;
