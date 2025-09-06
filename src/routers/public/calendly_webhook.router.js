let express = require("express");
const CalendlyWebhookController = require("../../controllers/public/calendly_webhook.controller");

class CalendlyWebhookRouter {
  constructor() {
    this.calendlyWebhookController = new CalendlyWebhookController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.post(
      "/webhook",
      this.calendlyWebhookController.verifySignature,
      this.calendlyWebhookController.handleWebhook
    );

    app.use("/calendly", router);
  }
}

module.exports = CalendlyWebhookRouter;
