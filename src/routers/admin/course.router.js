let express = require("express");
const CourseController = require("../../controllers/admin/course.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class CourseRouter {
  constructor() {
    this.controller = new CourseController();
    this.UploadMiddleware = UploadMiddleware.uploadSingle("image", "courses/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.academies));

    router.get("", this.controller.findMany);
    router.get("/:id", this.controller.findOne);
    router.post("", this.UploadMiddleware, this.controller.create);
    router.put("/update", this.UploadMiddleware, this.controller.update);
    router.delete("/delete/:ids", this.controller.delete);

    app.use("/course", router);
  }
}

module.exports = CourseRouter;
