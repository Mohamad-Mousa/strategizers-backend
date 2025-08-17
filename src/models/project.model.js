const { mongoose, Content, ObjectId } = require("./model-template");

const Project = mongoose.model(
  "Project",
  new mongoose.Schema(
    {
      title: Content,
      shortDescription: Content,
      image: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      service: {
        type: ObjectId,
        ref: "Service",
        required: true,
      },
      customer: {
        type: String,
        required: true,
      },
      link: {
        type: String,
      },
      projectAnalysis: Content,
      projectSolutions: Content,
      projectResults: Content,
      date: {
        type: Date,
        required: true,
      },
      tags: [String],
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Project;
