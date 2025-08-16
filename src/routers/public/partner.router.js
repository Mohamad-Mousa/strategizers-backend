let express = require("express");
const PartnerController = require("../../controllers/public/partner.controller");

class PartnerRouter {
  constructor() {
    this.partnerController = new PartnerController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.partnerController.findMany);

    app.use("/partner", router);
  }
}
module.exports = PartnerRouter;
