const { mongoose } = require("./model-template");

const Job = mongoose.model(
  "Job",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["full-time", "part-time", "freelance"],
        required: true,
      },
      responsibilities: [
        {
          type: String,
          required: true,
        },
      ],
      requirements: [
        {
          type: String,
          required: true,
        },
      ],
      isActive: {
        type: Boolean,
        default: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = Job;
