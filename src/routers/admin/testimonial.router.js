let express = require("express");
const TestimonialController = require("../../controllers/admin/testimonial.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class TestimonialRouter {
  constructor() {
    this.testimonialController = new TestimonialController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.testimonials));

    router.get("", this.testimonialController.findMany);
    router.get("/:id", this.testimonialController.findOne);
    router.post("", this.testimonialController.create);
    router.put("/update", this.testimonialController.update);
    router.delete("/delete/:ids", this.testimonialController.delete);

    app.use("/testimonial", router);
  }
}
module.exports = TestimonialRouter;
