const { mongoose, Content } = require("./model-template");

const Service = mongoose.model(
  "Service",
  new mongoose.Schema(
    {
      title: Content,
      shortDescription: Content,
      longDescription: Content,
      slug: {
        type: String,
        required: true,
        unique: true,
      },
      icon: {
        type: String,
        required: true,
      },
      banner: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      subServices: [
        {
          title: Content,
          description: Content,
          icon: {
            type: String,
            required: true,
          },
        },
      ],
      benefits: {
        description: Content,
        features: [
          {
            type: String,
            required: true,
          },
        ],
        video: {
          type: String,
        },
      },
      brochure: {
        pdf: {
          type: String,
        },
        document: {
          type: String,
        },
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

module.exports = Service;
