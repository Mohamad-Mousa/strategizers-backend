const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const CourseService = require("../../services/public/course.service");

class CourseController {
  constructor() {
    this.courseService = new CourseService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const courses = await this.courseService.findMany(req.query);
      ResponseService.success(res, "Success!", courses, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const course = await this.courseService.findOne(req.params.slug);
      ResponseService.success(res, "Success!", course, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = CourseController;
