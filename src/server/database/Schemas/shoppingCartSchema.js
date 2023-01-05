const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    items: {
      type: Array,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = shoppingCartSchema;
