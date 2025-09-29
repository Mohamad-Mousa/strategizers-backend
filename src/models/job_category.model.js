const { mongoose, Content } = require("./model-template");

const JobCategory = mongoose.model(
  "JobCategory",
  new mongoose.Schema(
    {
      title: Content,
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

module.exports = JobCategory;
