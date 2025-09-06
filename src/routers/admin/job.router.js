let express = require("express");
const JobController = require("../../controllers/admin/job.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class JobRouter {
  constructor() {
    this.jobController = new JobController();
    this.uploadMiddleware = UploadMiddleware.uploadSingle("image", "jobs/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.jobs));

    router.get("", this.jobController.findMany);
    router.get("/:id", this.jobController.findOne);
    router.post("", this.uploadMiddleware, this.jobController.create);
    router.put("/update", this.uploadMiddleware, this.jobController.update);
    router.delete("/delete/:ids", this.jobController.delete);

    app.use("/job", router);
  }
}

module.exports = JobRouter;
