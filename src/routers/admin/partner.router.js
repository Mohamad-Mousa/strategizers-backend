let express = require("express");
const PartnerController = require("../../controllers/admin/partner.controller");
const PrivilegesMiddleware = require("../../middlewares/privileges.middleware");
const function_Keys = require("../../config/functions");
const UploadMiddleware = require("../../middlewares/upload.middleware");

class PartnerRouter {
  constructor() {
    this.partnerController = new PartnerController();
    this.UploadMiddleware = UploadMiddleware.uploadSingle("image", "partners/");
  }

  configureRoutes(app) {
    let router = express.Router();

    router.use(PrivilegesMiddleware.isAllowed(function_Keys.partners));

    router.get("", this.partnerController.findMany);
    router.get("/:id", this.partnerController.findOne);
    router.post("", this.UploadMiddleware, this.partnerController.create);
    router.put("/update", this.UploadMiddleware, this.partnerController.update);
    router.delete("/delete/:ids", this.partnerController.delete);

    app.use("/partner", router);
  }
}
module.exports = PartnerRouter;
