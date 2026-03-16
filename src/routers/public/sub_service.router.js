let express = require("express");
const SubServiceController = require("../../controllers/public/sub_service.controller");

class SubServiceRouter {
  constructor() {
    this.subServiceController = new SubServiceController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.subServiceController.findMany);
    router.get("/:slug", this.subServiceController.findOne);

    app.use("/sub-service", router);
  }
}
module.exports = SubServiceRouter;
