const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log("Connected to Database 📚");
    })
    .catch((err) => {
      console.log(err);
    });
module.exports = connectDB;
