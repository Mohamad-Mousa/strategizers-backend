let express = require("express");
const ProposalController = require("../../controllers/public/proposal.controller");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class ProposalRouter {
  constructor() {
    this.proposalController = new ProposalController();
    this.UploadMiddleware = UploadMiddleware.uploadSingle(
      "document",
      "proposals/"
    );
  }

  configureRoutes(app) {
    let router = express.Router();

    router.post("", this.UploadMiddleware, this.proposalController.create);

    app.use("/proposal", router);
  }
}

module.exports = ProposalRouter;
