const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const BlogService = require("../../services/admin/blog.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class BlogController {
  constructor() {
    this.blogService = new BlogService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const blogs = await this.blogService.findMany(req.query);
      ResponseService.success(res, "Success!", blogs, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const blog = await this.blogService.findOne(req.params.id);
      ResponseService.success(res, "Success!", blog, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  create = asyncHandler(async (req, res) => {
    try {
      const blog = await this.blogService.create(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.blogs,
        "Blog Created."
      );
      ResponseService.success(res, "Success!", blog, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.blogService.update(req.body, req.file);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.blogs,
        "Blog Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.blogService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.blogs,
        "Blog Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = BlogController;
