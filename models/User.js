const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: function (value) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
        },
        message: "Invalid email format.",
      },
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String], // Array of strings
      default: ["user"],
      validate: {
        validator: function (value) {
          return Array.isArray(value);
        },
        message: "Roles must be an array.",
      },
    },
  },
  {
    timestamps: true, // Automatically creates `createdAt` & `updatedAt`
  }
);

module.exports = mongoose.model("User", userSchema);