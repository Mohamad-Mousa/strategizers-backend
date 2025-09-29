let express = require("express");
const ProgramCategoryController = require("../../controllers/admin/program_category.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class ProgramCategoryRouter {
  constructor() {
    this.controller = new ProgramCategoryController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.academies));

    router.get("", this.controller.findMany);
    router.get("/:id", this.controller.findOne);
    router.post("", this.controller.create);
    router.put("/update", this.controller.update);
    router.delete("/delete/:ids", this.controller.delete);

    app.use("/program-category", router);
  }
}

module.exports = ProgramCategoryRouter;
