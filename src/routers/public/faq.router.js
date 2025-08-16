let express = require("express");
const FAQController = require("../../controllers/public/faq.controller");

class FAQRouter {
  constructor() {
    this.faqController = new FAQController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.faqController.findMany);

    app.use("/faq", router);
  }
}
module.exports = FAQRouter;
