const mongoose = require("mongoose");
const shoppingCartSchema = require("../Schemas/shoppingCartSchema");
const ShoppingCart = mongoose.model("ShoppingCart", shoppingCartSchema);

module.exports = ShoppingCart;
