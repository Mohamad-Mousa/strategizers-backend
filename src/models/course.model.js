const { mongoose, Content, ObjectId } = require("./model-template");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema(
    {
      title: Content,
      programOverview: Content,
      programObjectives: [Content],
      targetAudience: [Content],
      expectedOrganizationalBenefits: [Content],
      programDuration: Content,
      programDurationDetails: Content,
      deliveryFormat: [Content],
      programMethodology: [Content],
      programOutline: [
        {
          title: Content,
          items: [Content],
        },
      ],
      samplePracticalActivities: [Content],
      image: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      academyCategory: {
        type: ObjectId,
        ref: "AcademyCategory",
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
