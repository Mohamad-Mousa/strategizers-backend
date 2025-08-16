let express = require("express");
const BlogController = require("../../controllers/admin/blog.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class BlogRouter {
  constructor() {
    this.blogController = new BlogController();
    this.UploadMiddleware = UploadMiddleware.uploadSingle("image", "blogs/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.blogs));

    router.get("", this.blogController.findMany);
    router.get("/:id", this.blogController.findOne);
    router.post("", this.UploadMiddleware, this.blogController.create);
    router.put("/update", this.UploadMiddleware, this.blogController.update);
    router.delete("/delete/:ids", this.blogController.delete);

    app.use("/blog", router);
  }
}
module.exports = BlogRouter;
