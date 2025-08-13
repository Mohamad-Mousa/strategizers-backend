let express = require("express");
const WebsiteController = require("../../controllers/admin/website.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class WebsiteRouter {
  constructor() {
    this.websiteController = new WebsiteController();
    this.UploadMiddleware = UploadMiddleware.uploadAny("website/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.website));

    router.get("", this.websiteController.findMany);
    router.put("/update", this.UploadMiddleware, this.websiteController.update);

    app.use("/website", router);
  }
}
module.exports = WebsiteRouter;
