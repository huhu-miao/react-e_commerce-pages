const mongoose = require("mongoose");
const productsSchema = require("../Schemas/productsSchema");
const Products = mongoose.model("Products", productsSchema);

module.exports = Products;
