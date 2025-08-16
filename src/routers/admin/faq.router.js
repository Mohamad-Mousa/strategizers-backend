let express = require("express");
const FAQController = require("../../controllers/admin/faq.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class FAQRouter {
  constructor() {
    this.faqController = new FAQController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.faqs));

    router.get("", this.faqController.findMany);
    router.get("/:id", this.faqController.findOne);
    router.post("", this.faqController.create);
    router.put("/update", this.faqController.update);
    router.delete("/delete/:ids", this.faqController.delete);

    app.use("/faq", router);
  }
}
module.exports = FAQRouter;
