const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const CourseService = require("../../services/admin/course.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class CourseController {
  constructor() {
    this.courseService = new CourseService();
    this.UserLogService = new UserLogService();
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
      const course = await this.courseService.findOne(req.params.id);
      ResponseService.success(res, "Success!", course, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const course = await this.courseService.create(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Created a course."
      );
      ResponseService.success(res, "Success!", course, 201);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.courseService.update(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Updated a course."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.courseService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.academies,
        "Admin Deleted a course."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = CourseController;
