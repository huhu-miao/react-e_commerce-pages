//mongodb => setup schema => setup model => use model to query and update entrity in the database

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an Email"],
      unique: [true, "Email Exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      unique: false,
    },
    id: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
