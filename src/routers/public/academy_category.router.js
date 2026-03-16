let express = require("express");
const AcademyCategoryController = require("../../controllers/public/academy_category.controller");

class AcademyCategoryRouter {
  constructor() {
    this.controller = new AcademyCategoryController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.controller.findMany);
    router.get("/:id", this.controller.findOne);

    app.use("/academy-category", router);
  }
}

module.exports = AcademyCategoryRouter;
