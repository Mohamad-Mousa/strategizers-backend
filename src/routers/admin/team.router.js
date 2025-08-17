let express = require("express");
const TeamController = require("../../controllers/admin/team.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class TeamRouter {
  constructor() {
    this.teamController = new TeamController();
    this.UploadMiddleware = UploadMiddleware.uploadSingle("image", "teams/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.teams));

    router.get("", this.teamController.findMany);
    router.get("/:id", this.teamController.findOne);
    router.post("", this.UploadMiddleware, this.teamController.create);
    router.put("/update", this.UploadMiddleware, this.teamController.update);
    router.delete("/delete/:ids", this.teamController.delete);

    app.use("/team", router);
  }
}
module.exports = TeamRouter;
