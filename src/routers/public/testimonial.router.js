let express = require("express");
const TestimonialController = require("../../controllers/public/testimonial.controller");

class TestimonialRouter {
  constructor() {
    this.testimonialController = new TestimonialController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.testimonialController.findMany);

    app.use("/testimonial", router);
  }
}
module.exports = TestimonialRouter;
