let express = require("express");
const AdminController = require("../../controllers/admin/admin.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class AdminRouter {
  constructor() {
    this.adminController = new AdminController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.admins));

    router.get("", this.adminController.findMany);
    router.post("", this.adminController.create);
    router.put("/update", this.adminController.update);
    router.delete("/delete/:ids", this.adminController.delete);

    app.use("/admins", router);
  }
}
module.exports = AdminRouter;
