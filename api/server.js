const { config } = require("dotenv");
const express = require("express");
const userRouter = require("./routes/userRoute");
const connectDb = require("./database/db");
const app = express();
config();
const PORT = process.env.PORT || 5000;
connectDb();
app.use(express.json());
app.use("/", userRouter);

app.get("/", (req, res) => {
  res.send("Server is running on port 3k");
});

// listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥`);
});
