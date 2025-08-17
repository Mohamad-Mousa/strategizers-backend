let express = require("express");
const NewsletterController = require("../../controllers/admin/newsletter.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class NewsletterRouter {
  constructor() {
    this.newsletterController = new NewsletterController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.newsletters));

    router.get("", this.newsletterController.findMany);
    router.get("/:id", this.newsletterController.findOne);
    router.post("", this.newsletterController.create);
    router.delete("/delete/:ids", this.newsletterController.delete);

    app.use("/newsletter", router);
  }
}
module.exports = NewsletterRouter;
