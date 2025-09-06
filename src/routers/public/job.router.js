let express = require("express");
const JobController = require("../../controllers/public/job.controller");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class JobRouter {
  constructor() {
    this.jobController = new JobController();
    this.uploadMiddleware = UploadMiddleware.uploadSingle(
      "document",
      "job_applications/"
    );
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.jobController.findMany);
    router.get("/:slug", this.jobController.findOne);
    router.post("/apply", this.uploadMiddleware, this.jobController.apply);

    app.use("/job", router);
  }
}

module.exports = JobRouter;
