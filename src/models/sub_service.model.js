const { mongoose, Content, ObjectId } = require("./model-template");

const SubService = mongoose.model(
  "SubService",
  new mongoose.Schema(
    {
      title: Content,
      outcome: Content,
      oneLineValuePromise: Content,
      strategicIssuesWeResolve: [Content],
      whatYouGet: [Content],
      service: {
        type: ObjectId,
        ref: "Service",
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      icon: {
        type: String,
        default: "",
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

module.exports = SubService;
