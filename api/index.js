const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./database/db");

require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

const port = process.env.PORT;

connectDB().then(() => {
  app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
});
