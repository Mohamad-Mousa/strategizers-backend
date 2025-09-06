const BaseService = require("../core/base.service");
const StringFormatter = require("../core/string_formatter");
const CustomError = require("../core/custom_error.service");
const BodyValidationService = require("../core/body_validation.service");
const CalendlyService = require("../core/calendly.service");

class BookingService extends BaseService {
  constructor() {
    super();
    this.Booking = this.models.Booking;
    this.bodyValidationService = BodyValidationService;
    this.calendlyService = new CalendlyService();
  }

  async findMany(req_query, limit = 10) {
    if (req_query.limit) limit = +req_query.limit;
    let regexSearch = req_query.term
      ? StringFormatter.escapeBackslashAndPlus(req_query.term)
      : "";
    let query = {
      ...(req_query.term && {
        $or: [
          { firstName: { $regex: new RegExp(regexSearch, "i") } },
          { lastName: { $regex: new RegExp(regexSearch, "i") } },
          { companyName: { $regex: new RegExp(regexSearch, "i") } },
          { email: { $regex: new RegExp(regexSearch, "i") } },
          { position: { $regex: new RegExp(regexSearch, "i") } },
          { "businessPhone.code": { $regex: new RegExp(regexSearch, "i") } },
          { "businessPhone.number": { $regex: new RegExp(regexSearch, "i") } },
        ],
      }),
      ...(req_query.status && { status: req_query.status }),
      ...(req_query.isRead !== undefined && {
        isRead: req_query.isRead === "true",
      }),
    };

    let pipes = [];
    if (req_query.sortBy) {
      let dir = 1;
      if (req_query.sortDirection == "desc") dir = -1;
      let key = req_query.sortBy;
      pipes.push({ $sort: { [key]: dir } });
    } else {
      pipes.push({ $sort: { createdAt: -1 } });
    }

    let result = await this.Booking.aggregate([
      { $match: query },
      ...pipes,
      {
        $facet: {
          data: [
            { $skip: req_query.page ? (req_query.page - 1) * limit : 0 },
            { $limit: limit },
          ],
          totalCount: [{ $count: "total" }],
        },
      },
    ]);
    let data = result[0].data;
    let totalCount = result[0].totalCount[0]
      ? result[0].totalCount[0].total
      : 0;
    return { data, totalCount };
  }

  async findOne(id) {
    const booking = await this.Booking.findOne({
      _id: id,
    });
    if (!booking) {
      throw new CustomError("Booking not found", 404);
    }
    return { booking };
  }

  async update(body) {
    this.bodyValidationService.validateRequiredFields(body, ["_id"]);

    const updateData = {};

    if (body.status !== undefined) {
      updateData.status = body.status;
    }
    if (body.isRead !== undefined) {
      updateData.isRead = body.isRead;
    }
    if (body.meetingNotes !== undefined) {
      updateData.meetingNotes = body.meetingNotes;
    }
    if (body.scheduledAt !== undefined) {
      updateData.scheduledAt = body.scheduledAt;
    }

    const booking = await this.Booking.findByIdAndUpdate(body._id, updateData, {
      new: true,
    });

    if (!booking) {
      throw new CustomError("Booking not found", 404);
    }

    return { booking };
  }

  async delete(ids) {
    const idArray = ids.split(",");
    await this.Booking.deleteMany({
      _id: { $in: idArray },
    });
  }

  async cancelBooking(id, reason = "Cancelled by admin") {
    const booking = await this.Booking.findById(id);
    if (!booking) {
      throw new CustomError("Booking not found", 404);
    }

    // Cancel the Calendly event if it exists
    if (booking.calendlyEventUri) {
      try {
        await this.calendlyService.cancelEvent(
          booking.calendlyEventUri,
          reason
        );
      } catch (error) {
        console.error("Failed to cancel Calendly event:", error.message);
        // Continue with local cancellation even if Calendly fails
      }
    }

    // Update booking status
    const updatedBooking = await this.Booking.findByIdAndUpdate(
      id,
      {
        status: "cancelled",
        meetingNotes: reason,
      },
      { new: true }
    );

    return { booking: updatedBooking };
  }

  async getCalendlyEventDetails(id) {
    const booking = await this.Booking.findById(id);
    if (!booking) {
      throw new CustomError("Booking not found", 404);
    }

    if (!booking.calendlyEventUri) {
      throw new CustomError(
        "No Calendly event associated with this booking",
        404
      );
    }

    try {
      const eventDetails = await this.calendlyService.getEventDetails(
        booking.calendlyEventUri
      );
      return { eventDetails };
    } catch (error) {
      throw new CustomError(
        `Failed to fetch Calendly event details: ${error.message}`,
        400
      );
    }
  }

  async getCalendlyInviteeDetails(id) {
    const booking = await this.Booking.findById(id);
    if (!booking) {
      throw new CustomError("Booking not found", 404);
    }

    if (!booking.calendlyInviteeUri) {
      throw new CustomError(
        "No Calendly invitee associated with this booking",
        404
      );
    }

    try {
      const inviteeDetails = await this.calendlyService.getInviteeDetails(
        booking.calendlyInviteeUri
      );
      return { inviteeDetails };
    } catch (error) {
      throw new CustomError(
        `Failed to fetch Calendly invitee details: ${error.message}`,
        400
      );
    }
  }

  async getCalendlyInfo() {
    try {
      const [userInfo, eventTypes] = await Promise.all([
        this.calendlyService.getCurrentUser(),
        this.calendlyService.getEventTypes(),
      ]);

      return { userInfo, eventTypes };
    } catch (error) {
      throw new CustomError(
        `Failed to fetch Calendly information: ${error.message}`,
        400
      );
    }
  }
}

module.exports = BookingService;
