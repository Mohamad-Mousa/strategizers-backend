let express = require("express");

const SettingController = require("../../controllers/admin/setting.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class SettingRouter {
  constructor() {
    this.settingController = new SettingController();
    this.UploadMiddleware = UploadMiddleware.uploadAny("settings/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.settings));

    router.get("", this.settingController.findMany);
    router.put("/update", this.UploadMiddleware, this.settingController.update);

    app.use("/setting", router);
  }
}
module.exports = SettingRouter;
