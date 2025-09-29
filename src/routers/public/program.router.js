let express = require("express");
const ProgramController = require("../../controllers/public/program.controller");

class ProgramRouter {
  constructor() {
    this.programController = new ProgramController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.programController.findMany);
    router.get("/:id", this.programController.findOne);

    app.use("/program", router);
  }
}

module.exports = ProgramRouter;
