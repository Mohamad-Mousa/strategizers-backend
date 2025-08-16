const { mongoose, Content } = require("./model-template");

const Partner = mongoose.model(
  "Partner",
  new mongoose.Schema(
    {
      title: Content,
      image: {
        type: String,
        required: true,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Partner;
