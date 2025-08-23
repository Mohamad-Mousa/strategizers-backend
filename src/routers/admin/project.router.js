let express = require("express");
const ProjectController = require("../../controllers/admin/project.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class ProjectRouter {
  constructor() {
    this.projectController = new ProjectController();
    this.UploadMiddleware = UploadMiddleware.uploadAny("projects/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.projects));

    router.get("", this.projectController.findMany);
    router.get("/:id", this.projectController.findOne);
    router.post("", this.UploadMiddleware, this.projectController.create);
    router.put("/update", this.UploadMiddleware, this.projectController.update);
    router.delete("/delete/:ids", this.projectController.delete);

    app.use("/project", router);
  }
}
module.exports = ProjectRouter;
