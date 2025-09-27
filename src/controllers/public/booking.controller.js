const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const BookingService = require("../../services/public/booking.service");

class BookingController {
  constructor() {
    this.bookingService = new BookingService();
  }

  create = asyncHandler(async (req, res) => {
    try {
      const result = await this.bookingService.create(req.body);
      ResponseService.success(res, "Success!", result, 201);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const result = await this.bookingService.findOne(req.params.id);
      ResponseService.success(res, "Success!", result, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 404);
    }
  });

  updateStatus = asyncHandler(async (req, res) => {
    try {
      const result = await this.bookingService.updateStatus(
        req.params.id,
        req.body.status,
        req.body.eventData
      );
      ResponseService.success(res, "Success!", result, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = BookingController;
