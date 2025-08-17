let express = require("express");
const NewsletterController = require("../../controllers/public/newsletter.controller");

class NewsletterRouter {
  constructor() {
    this.newsletterController = new NewsletterController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.post("/subscribe", this.newsletterController.create);
    router.delete("/unsubscribe/:email", this.newsletterController.delete);

    app.use("/newsletter", router);
  }
}
module.exports = NewsletterRouter;
