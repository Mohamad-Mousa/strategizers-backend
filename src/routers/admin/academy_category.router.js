let express = require("express");
const AcademyCategoryController = require("../../controllers/admin/academy_category.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class AcademyCategoryRouter {
  constructor() {
    this.controller = new AcademyCategoryController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.academies));

    router.get("", this.controller.findMany);
    router.get("/:id", this.controller.findOne);
    router.post("", this.controller.create);
    router.put("/update", this.controller.update);
    router.delete("/delete/:ids", this.controller.delete);

    app.use("/academy-category", router);
  }
}

module.exports = AcademyCategoryRouter;
