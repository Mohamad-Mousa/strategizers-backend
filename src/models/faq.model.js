const { mongoose, Content } = require("./model-template");

const FAQ = mongoose.model(
  "FAQ",
  new mongoose.Schema(
    {
      question: Content,
      answer: Content,
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = FAQ;
