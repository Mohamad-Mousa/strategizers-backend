let express = require("express");
const TeamController = require("../../controllers/public/team.controller");

class TeamRouter {
  constructor() {
    this.teamController = new TeamController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.teamController.findMany);
    router.get("/:id", this.teamController.findOne);

    app.use("/team", router);
  }
}
module.exports = TeamRouter;
