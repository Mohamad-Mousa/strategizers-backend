let express = require("express");
const JobApplicationController = require("../../controllers/admin/job_application.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class JobApplicationRouter {
  constructor() {
    this.jobApplicationController = new JobApplicationController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.jobApplications));

    router.get("", this.jobApplicationController.findMany);
    router.get("/:id", this.jobApplicationController.findOne);
    router.put("/update", this.jobApplicationController.update);
    router.delete("/delete/:ids", this.jobApplicationController.delete);

    app.use("/job-application", router);
  }
}

module.exports = JobApplicationRouter;
