const { mongoose, Phone } = require("./model-template");

const Proposal = mongoose.model(
  "Proposal",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      jobTitle: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: Phone,
      country: {
        type: String,
        required: true,
      },
      areaOfInterest: {
        type: String,
        required: true,
      },
      industry: {
        type: String,
        required: true,
      },
      companyName: {
        type: String,
        required: true,
      },
      yearlyRevenue: {
        type: String,
        required: true,
      },
      document: String,
      comment: String,
      isRead: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = Proposal;
