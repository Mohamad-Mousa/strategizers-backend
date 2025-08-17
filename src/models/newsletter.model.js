const { mongoose } = require("./model-template");

const Newsletter = mongoose.model(
  "Newsletter",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Newsletter;
