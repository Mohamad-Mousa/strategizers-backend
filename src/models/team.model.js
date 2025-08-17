const { mongoose, Content } = require("./model-template");

const Team = mongoose.model(
  "Team",
  new mongoose.Schema(
    {
      name: Content,
      position: Content,
      image: {
        type: String,
        required: true,
      },
      description: Content,
      phone: {
        code: Number,
        number: Number,
      },
      email: {
        type: String,
      },
      social: {
        facebook: String,
        instagram: String,
        linkedin: String,
        twitter: String,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Team;
