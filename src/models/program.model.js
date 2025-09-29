const { mongoose, Content, ObjectId } = require("./model-template");

const Program = mongoose.model(
  "Program",
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
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = Program;
