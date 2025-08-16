const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const TestimonialService = require("../../services/public/testimonial.service");

class TestimonialController {
  constructor() {
    this.testimonialService = new TestimonialService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const testimonials = await this.testimonialService.findMany(req.query);
      ResponseService.success(res, "Success!", testimonials, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = TestimonialController;
