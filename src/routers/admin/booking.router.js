let express = require("express");
const BookingController = require("../../controllers/admin/booking.controller");

class BookingRouter {
  constructor() {
    this.bookingController = new BookingController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.get("", this.bookingController.findMany);
    router.get("/:id", this.bookingController.findOne);
    router.put("", this.bookingController.update);
    router.delete("/:ids", this.bookingController.delete);

    router.post("/:id/cancel", this.bookingController.cancelBooking);

    router.get(
      "/:id/calendly/event",
      this.bookingController.getCalendlyEventDetails
    );
    router.get(
      "/:id/calendly/invitee",
      this.bookingController.getCalendlyInviteeDetails
    );
    router.get("/calendly/info", this.bookingController.getCalendlyInfo);

    app.use("/booking", router);
  }
}

module.exports = BookingRouter;
