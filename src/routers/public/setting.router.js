let express = require("express");

const SettingController = require("../../controllers/public/setting.controller");

class SettingRouter {
  constructor() {
    this.settingController = new SettingController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.settingController.findMany);

    app.use("/setting", router);
  }
}
module.exports = SettingRouter;
