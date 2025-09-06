let express = require("express");
const BookingController = require("../../controllers/public/booking.controller");

class BookingRouter {
  constructor() {
    this.bookingController = new BookingController();
  }

  configureRoutes(app) {
    let router = express.Router();

    router.post("", this.bookingController.create);
    router.get("/:id", this.bookingController.findOne);
    router.patch("/:id/status", this.bookingController.updateStatus);

    app.use("/booking", router);
  }
}

module.exports = BookingRouter;
