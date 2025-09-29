let express = require("express");
const ProgramCategoryController = require("../../controllers/public/program_category.controller");

class ProgramCategoryRouter {
  constructor() {
    this.controller = new ProgramCategoryController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.controller.findMany);
    router.get("/:id", this.controller.findOne);

    app.use("/program-category", router);
  }
}

module.exports = ProgramCategoryRouter;
