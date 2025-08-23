const { mongoose, Content } = require("./model-template");

const Testimonial = mongoose.model(
  "Testimonial",
  new mongoose.Schema(
    {
      name: Content,
      position: Content,
      description: Content,
      image: String,
      isActive: {
        type: Boolean,
        default: true,
      },
      isFeatured: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = Testimonial;
