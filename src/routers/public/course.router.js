let express = require("express");
const CourseController = require("../../controllers/public/course.controller");

class CourseRouter {
  constructor() {
    this.controller = new CourseController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.controller.findMany);
    router.get("/:slug", this.controller.findOne);

    app.use("/course", router);
  }
}

module.exports = CourseRouter;
