const mongoose = require("mongoose");
const userSchema = require("../Schemas/userSchema");
const UserInfo = mongoose.model("UserInfo", userSchema);

module.exports = UserInfo;
