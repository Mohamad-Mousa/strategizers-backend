const { mongoose, ObjectId, enums } = require("./model-template");

const Admin = mongoose.model(
  "Admin",
  new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        index: true,
        trim: true,
      },
      firstName: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      password: {
        type: String,
        required: true,
        select: false,
      },
      type: {
        type: ObjectId,
        ref: "AdminType",
        required: true,
        index: true,
      },
      image: {
        type: String,
      },
      tokens: [
        {
          type: String,
          validate: {
            validator: function (tokens) {
              return tokens.length > 0;
            },
            message: "Token to be provided",
          },
        },
      ],
      lastLogin: {
        type: Date,
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

module.exports = Admin;
