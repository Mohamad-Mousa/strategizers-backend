const { mongoose, Phone } = require("./model-template");

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      companyWebsite: {
        type: String,
        required: true,
      },
      position: {
        type: String,
        required: true,
      },
      isDecisionMaker: {
        type: Boolean,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      businessPhone: Phone,
      calendlyLink: {
        type: String,
        required: true,
      },
      calendlyEventUri: {
        type: String,
        default: null,
      },
      calendlyInviteeUri: {
        type: String,
        default: null,
      },
      status: {
        type: String,
        enum: ["pending", "scheduled", "completed", "cancelled"],
        default: "pending",
      },
      scheduledAt: {
        type: Date,
        default: null,
      },
      meetingNotes: {
        type: String,
        default: null,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = Booking;
