const mongoose = require("mongoose");
const connectionStr =
  "mongodb+srv://Project2:p8qwKcRgxRzMRY2D@cluster0.surafbx.mongodb.net/project2?retryWrites=true&w=majority";

const connectToMongoose = () => {
  mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.on("open", () => {
    console.log("connect to mongodb !");
  });
};
module.exports = connectToMongoose;
