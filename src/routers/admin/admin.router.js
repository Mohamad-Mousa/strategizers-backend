let express = require("express");
const AdminController = require("../../controllers/admin/admin.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class AdminRouter {
  constructor() {
    this.adminController = new AdminController();
    this.UploadMiddleware = UploadMiddleware.uploadSingle("image", "admins/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.admins));

    router.get("", this.adminController.findMany);
    router.post("", this.UploadMiddleware, this.adminController.create);
    router.put("/update", this.UploadMiddleware, this.adminController.update);
    router.delete("/delete/:ids", this.adminController.delete);

    app.use("/admins", router);
  }
}
module.exports = AdminRouter;
