let express = require("express");
const ProjectController = require("../../controllers/public/project.controller");

class ProjectRouter {
  constructor() {
    this.projectController = new ProjectController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.projectController.findMany);
    router.get("/:slug", this.projectController.findOne);

    app.use("/project", router);
  }
}
module.exports = ProjectRouter;
