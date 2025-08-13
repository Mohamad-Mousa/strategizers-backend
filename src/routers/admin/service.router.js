let express = require("express");
const ServiceController = require("../../controllers/admin/service.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class ServiceRouter {
  constructor() {
    this.serviceController = new ServiceController();
    this.UploadMiddleware = UploadMiddleware.uploadAny("services/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.services));

    router.get("", this.serviceController.findMany);
    router.get("/:id", this.serviceController.findOne);
    router.post("", this.UploadMiddleware, this.serviceController.create);
    router.put("/update", this.UploadMiddleware, this.serviceController.update);
    router.delete("/delete/:ids", this.serviceController.delete);

    app.use("/service", router);
  }
}
module.exports = ServiceRouter;
