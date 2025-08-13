let express = require("express");
const WebsiteController = require("../../controllers/public/website.controller");

class WebsiteRouter {
  constructor() {
    this.websiteController = new WebsiteController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.websiteController.findMany);

    app.use("/website", router);
  }
}
module.exports = WebsiteRouter;
