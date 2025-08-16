const { mongoose, Phone } = require("./model-template");

const Contact = mongoose.model(
  "Contact",
  new mongoose.Schema(
    {
      fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: Phone,
      subject: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  )
);

module.exports = Contact;
