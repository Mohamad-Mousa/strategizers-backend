let express = require("express");
const SubServiceController = require("../../controllers/admin/sub_service.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class SubServiceRouter {
  constructor() {
    this.subServiceController = new SubServiceController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.subServices));

    router.get("", this.subServiceController.findMany);
    router.get("/:id", this.subServiceController.findOne);
    router.post("", this.subServiceController.create);
    router.put("/update", this.subServiceController.update);
    router.delete("/delete/:ids", this.subServiceController.delete);

    app.use("/sub-service", router);
  }
}
module.exports = SubServiceRouter;
