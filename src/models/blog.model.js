const { mongoose, Content, ObjectId } = require("./model-template");

const Blog = mongoose.model(
  "Blog",
  new mongoose.Schema(
    {
      title: Content,
      subTitle: Content,
      description: Content,
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      image: {
        type: String,
        required: true,
      },
      service: {
        type: ObjectId,
        ref: "Service",
      },
      author: {
        type: String,
        required: true,
      },
      tags: [
        {
          en: {
            type: String,
            required: true,
          },
          ar: {
            type: String,
            required: true,
          },
        },
      ],
      isActive: {
        type: Boolean,
        default: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Blog;
