const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const BlogService = require("../../services/public/blog.service");

class BlogController {
  constructor() {
    this.blogService = new BlogService();
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
      const blog = await this.blogService.findOne(req.params.slug);
      ResponseService.success(res, "Success!", blog, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = BlogController;
