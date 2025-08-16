let express = require("express");
const BlogController = require("../../controllers/public/blog.controller");

class BlogRouter {
  constructor() {
    this.blogController = new BlogController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.blogController.findMany);
    router.get("/:slug", this.blogController.findOne);

    app.use("/blog", router);
  }
}
module.exports = BlogRouter;
