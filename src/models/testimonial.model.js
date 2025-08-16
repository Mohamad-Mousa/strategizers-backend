const { mongoose, Content } = require("./model-template");

const Testimonial = mongoose.model(
  "Testimonial",
  new mongoose.Schema(
    {
      name: Content,
      position: Content,
      description: Content,
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Testimonial;
