let express = require("express");
const ContactController = require("../../controllers/public/contact.controller");

class ContactRouter {
  constructor() {
    this.contactController = new ContactController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.post("", this.contactController.create);

    app.use("/contact", router);
  }
}
module.exports = ContactRouter;
