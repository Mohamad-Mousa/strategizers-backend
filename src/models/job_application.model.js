const { mongoose, Phone, ObjectId } = require("./model-template");

const JobApplication = mongoose.model(
  "JobApplication",
  new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        index: true,
        trim: true,
      },
      phone: Phone,
      message: {
        type: String,
        trim: true,
      },
      document: {
        type: String,
        required: true,
      },
      job: {
        type: ObjectId,
        ref: "Job",
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = JobApplication;
