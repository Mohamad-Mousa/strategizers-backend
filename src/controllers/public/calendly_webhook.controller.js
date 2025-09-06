const asyncHandler = require("express-async-handler");
const crypto = require("crypto");

const ResponseService = require("../../services/core/response.service");
const BookingService = require("../../services/public/booking.service");

class CalendlyWebhookController {
  constructor() {
    this.bookingService = new BookingService();
  }

  verifySignature = (req, res, next) => {
    const signature = req.headers["calendly-webhook-signature"];
    const webhookSecret = process.env.CALENDLY_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
      return ResponseService.error(
        res,
        "Missing webhook signature or secret",
        401
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (signature !== expectedSignature) {
      return ResponseService.error(res, "Invalid webhook signature", 401);
    }

    next();
  };

  handleWebhook = asyncHandler(async (req, res) => {
    try {
      const { event, created_at, payload } = req.body;

      console.log(`Received Calendly webhook: ${event} at ${created_at}`);

      switch (event) {
        case "invitee.created":
          await this.handleInviteeCreated(payload);
          break;
        case "invitee.canceled":
          await this.handleInviteeCanceled(payload);
          break;
        case "invitee.no_show":
          await this.handleInviteeNoShow(payload);
          break;
        default:
          console.log(`Unhandled webhook event: ${event}`);
      }

      ResponseService.success(res, "Webhook processed successfully", null, 200);
    } catch (error) {
      console.error("Webhook processing error:", error);
      ResponseService.error(res, error.message, 400);
    }
  });

  async handleInviteeCreated(payload) {
    const { event, invitee } = payload;

    const booking = await this.bookingService.Booking.findOne({
      email: invitee.email,
    });

    if (booking) {
      await this.bookingService.updateStatus(booking._id, "scheduled", {
        eventUri: event.uri,
        inviteeUri: invitee.uri,
        scheduledAt: event.start_time,
      });

      console.log(`Updated booking ${booking._id} to scheduled status`);
    }
  }

  async handleInviteeCanceled(payload) {
    const { event, invitee } = payload;

    const booking = await this.bookingService.Booking.findOne({
      email: invitee.email,
    });

    if (booking) {
      await this.bookingService.updateStatus(booking._id, "cancelled", {
        eventUri: event.uri,
        inviteeUri: invitee.uri,
      });

      console.log(`Updated booking ${booking._id} to cancelled status`);
    }
  }

  async handleInviteeNoShow(payload) {
    const { event, invitee } = payload;

    const booking = await this.bookingService.Booking.findOne({
      email: invitee.email,
    });

    if (booking) {
      await this.bookingService.updateStatus(booking._id, "cancelled", {
        eventUri: event.uri,
        inviteeUri: invitee.uri,
      });

      console.log(
        `Updated booking ${booking._id} to cancelled status (no show)`
      );
    }
  }
}

module.exports = CalendlyWebhookController;
