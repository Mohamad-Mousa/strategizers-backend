const { mongoose, Content } = require("./model-template");

const AcademyCategory = mongoose.model(
  "AcademyCategory",
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

module.exports = AcademyCategory;
