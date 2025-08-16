const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const TestimonialService = require("../../services/admin/testimonial.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class TestimonialController {
  constructor() {
    this.testimonialService = new TestimonialService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const testimonials = await this.testimonialService.findMany(req.query);
      ResponseService.success(res, "Success!", testimonials, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const testimonial = await this.testimonialService.findOne(req.params.id);
      ResponseService.success(res, "Success!", testimonial, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const testimonial = await this.testimonialService.create(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.testimonials,
        "Testimonial Created."
      );
      ResponseService.success(res, "Success!", testimonial, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.testimonialService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.testimonials,
        "Testimonial Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.testimonialService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.testimonials,
        "Testimonial Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = TestimonialController;
