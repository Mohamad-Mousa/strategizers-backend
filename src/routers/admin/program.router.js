let express = require("express");
const ProgramController = require("../../controllers/admin/program.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class ProgramRouter {
  constructor() {
    this.programController = new ProgramController();
    this.UploadMiddleware = UploadMiddleware.uploadSingle("image", "programs/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.academies));

    router.get("", this.programController.findMany);
    router.get("/:id", this.programController.findOne);
    router.post("", this.UploadMiddleware, this.programController.create);
    router.put("/update", this.UploadMiddleware, this.programController.update);
    router.delete("/delete/:ids", this.programController.delete);

    app.use("/program", router);
  }
}

module.exports = ProgramRouter;
