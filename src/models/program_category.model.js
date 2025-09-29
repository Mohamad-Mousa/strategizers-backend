const { mongoose, Content, ObjectId } = require("./model-template");

const ProgramCategory = mongoose.model(
  "ProgramCategory",
  new mongoose.Schema(
    {
      title: Content,
      program: {
        type: ObjectId,
        ref: "Program",
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

module.exports = ProgramCategory;
