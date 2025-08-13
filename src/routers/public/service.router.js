let express = require("express");
const ServiceController = require("../../controllers/public/service.controller");

class ServiceRouter {
  constructor() {
    this.serviceController = new ServiceController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.serviceController.findMany);
    router.get("/:slug", this.serviceController.findOne);

    app.use("/service", router);
  }
}
module.exports = ServiceRouter;
