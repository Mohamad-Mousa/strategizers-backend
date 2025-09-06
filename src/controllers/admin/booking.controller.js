const asyncHandler = require("express-async-handler");

const ResponseService = require("../../services/core/response.service");
const BookingService = require("../../services/admin/booking.service");
const UserLogService = require("../../services/admin/user_log.service");
const function_Keys = require("../../config/functions");

class BookingController {
  constructor() {
    this.bookingService = new BookingService();
    this.UserLogService = new UserLogService();
  }

  findMany = asyncHandler(async (req, res) => {
    try {
      const bookings = await this.bookingService.findMany(req.query);
      ResponseService.success(res, "Success!", bookings, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  findOne = asyncHandler(async (req, res) => {
    try {
      const booking = await this.bookingService.findOne(req.params.id);
      ResponseService.success(res, "Success!", booking, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 404);
    }
  });

  update = asyncHandler(async (req, res) => {
    try {
      await this.bookingService.update(req.body);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.bookings,
        "Booking Updated."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  delete = asyncHandler(async (req, res) => {
    try {
      await this.bookingService.delete(req.params.ids);
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.bookings,
        "Booking Deleted."
      );
      ResponseService.success(res, "Success!", null, 200);
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  cancelBooking = asyncHandler(async (req, res) => {
    try {
      const result = await this.bookingService.cancelBooking(
        req.params.id,
        req.body.reason
      );
      this.UserLogService.create(
        req.decoded._id,
        req.method,
        function_Keys.bookings,
        "Booking Cancelled."
      );
      ResponseService.success(
        res,
        "Booking cancelled successfully!",
        result,
        200
      );
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  getCalendlyEventDetails = asyncHandler(async (req, res) => {
    try {
      const result = await this.bookingService.getCalendlyEventDetails(
        req.params.id
      );
      ResponseService.success(
        res,
        "Calendly event details retrieved successfully!",
        result,
        200
      );
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  getCalendlyInviteeDetails = asyncHandler(async (req, res) => {
    try {
      const result = await this.bookingService.getCalendlyInviteeDetails(
        req.params.id
      );
      ResponseService.success(
        res,
        "Calendly invitee details retrieved successfully!",
        result,
        200
      );
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });

  getCalendlyInfo = asyncHandler(async (req, res) => {
    try {
      const result = await this.bookingService.getCalendlyInfo();
      ResponseService.success(
        res,
        "Calendly information retrieved successfully!",
        result,
        200
      );
    } catch (error) {
      ResponseService.error(res, error.message, 400);
    }
  });
}

module.exports = BookingController;
