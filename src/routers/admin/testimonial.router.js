let express = require("express");
const TestimonialController = require("../../controllers/admin/testimonial.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class TestimonialRouter {
  constructor() {
    this.testimonialController = new TestimonialController();
    this.UploadMiddleware = UploadMiddleware.uploadSingle(
      "image",
      "testimonials/"
    );
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.testimonials));

    router.get("", this.testimonialController.findMany);
    router.get("/:id", this.testimonialController.findOne);
    router.post("", this.UploadMiddleware, this.testimonialController.create);
    router.put(
      "/update",
      this.UploadMiddleware,
      this.testimonialController.update
    );
    router.delete("/delete/:ids", this.testimonialController.delete);

    app.use("/testimonial", router);
  }
}
module.exports = TestimonialRouter;
