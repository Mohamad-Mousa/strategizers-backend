const { mongoose } = require("./model-template");

const AdminType = mongoose.model(
  "AdminType",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      isActive: {
        type: Boolean,
        required: true,
        default: true,
      },
      isDeleted: {
        type: Boolean,
        required: true,
        default: false,
        index: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = AdminType;
