let express = require("express");
const SeoController = require("../../controllers/admin/seo.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class SeoRouter {
  constructor() {
    this.seoController = new SeoController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.seo));

    router.get("", this.seoController.findMany);
    router.put("/update", this.seoController.update);

    app.use("/seo", router);
  }
}
module.exports = SeoRouter;
