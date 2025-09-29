const { mongoose, Content, ObjectId } = require("./model-template");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema(
    {
      title: Content,
      shortDescription: Content,
      longDescription: Content,
      image: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      programCategory: {
        type: ObjectId,
        ref: "ProgramCategory",
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

module.exports = Course;
