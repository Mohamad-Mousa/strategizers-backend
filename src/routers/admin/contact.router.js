let express = require("express");
const ContactController = require("../../controllers/admin/contact.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");

class ContactRouter {
  constructor() {
    this.contactController = new ContactController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.contacts));

    router.get("", this.contactController.findMany);
    router.get("/:id", this.contactController.findOne);
    router.put("/update", this.contactController.update);
    router.delete("/delete/:ids", this.contactController.delete);

    app.use("/contact", router);
  }
}
module.exports = ContactRouter;
