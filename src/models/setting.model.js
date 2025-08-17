const { mongoose, Phone, Content } = require("./model-template");

const Setting = mongoose.model(
  "Setting",
  new mongoose.Schema(
    {
      contact: {
        email: {
          type: String,
          required: true,
        },
        phone: Phone,
        address: {
          type: String,
          required: true,
        },
        map: {
          type: String,
        },
      },
      social: {
        facebook: {
          type: String,
        },
        instagram: {
          type: String,
        },
        twitter: {
          type: String,
        },
        linkedin: {
          type: String,
        },
        youtube: {
          type: String,
        },
        tiktok: {
          type: String,
        },
      },
      contactTeam: [
        {
          name: Content,
          position: Content,
          image: {
            type: String,
          },
          phone: {
            code: Number,
            number: Number,
          },
          email: {
            type: String,
          },
        },
      ],
    },
    { timestamps: true }
  )
);

module.exports = Setting;
