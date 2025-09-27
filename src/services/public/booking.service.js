const BaseService = require("../core/base.service");
const BodyValidationService = require("../core/body_validation.service");
const CalendlyService = require("../core/calendly.service");

class BookingService extends BaseService {
  constructor() {
    super();
    this.Booking = this.models.Booking;
    this.bodyValidationService = BodyValidationService;
    this.calendlyService = new CalendlyService();
  }

  async create(body) {
    this.bodyValidationService.validateRequiredFields(body, [
      "firstName",
      "lastName",
      "companyName",
      "companyWebsite",
      "position",
      "isDecisionMaker",
      "email",
      "businessPhone.code",
      "businessPhone.number",
    ]);

    const booking = await this.Booking.create(body);
    return { booking };

    // try {
    //   const calendlyResponse = await this.calendlyService.createSchedulingLink({
    //     maxEventCount: 1,
    //   });

    //   const bookingData = {
    //     ...body,
    //     calendlyLink: calendlyResponse.resource.booking_url,
    //     status: "pending",
    //   };

    //   const booking = await this.Booking.create(bookingData);

    //   return {
    //     booking,
    //     calendlyLink: calendlyResponse.resource.booking_url,
    //   };
    // } catch (error) {
    //   console.error("Calendly integration failed:", error.message);

    //   const bookingData = {
    //     ...body,
    //     calendlyLink: "https://calendly.com/your-username/meeting",
    //     status: "pending",
    //   };

    //   const booking = await this.Booking.create(bookingData);

    //   return {
    //     booking,
    //     calendlyLink: bookingData.calendlyLink,
    //     warning:
    //       "Calendly integration temporarily unavailable. Please contact us directly.",
    //   };
    // }
  }

  async findOne(id) {
    const booking = await this.Booking.findOne({
      _id: id,
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return { booking };
  }

  async updateStatus(id, status, eventData = null) {
    const updateData = { status };

    if (eventData) {
      if (eventData.eventUri) {
        updateData.calendlyEventUri = eventData.eventUri;
      }
      if (eventData.inviteeUri) {
        updateData.calendlyInviteeUri = eventData.inviteeUri;
      }
      if (eventData.scheduledAt) {
        updateData.scheduledAt = new Date(eventData.scheduledAt);
      }
    }

    const booking = await this.Booking.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    return { booking };
  }
}

module.exports = BookingService;
