const { config } = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoute");
const connectDb = require("./database/db");
const errorHandle = require("./middleware/errorMiddleware");
const openAIRouters = require("./routes/openAIRouters");
const app = express();

config();
const PORT = process.env.PORT || 5000;
connectDb();
app.use(express.json());
// ---- cookie parser
app.use(cookieParser());
app.use("/", userRouter);
app.use("/", openAIRouters);
app.use("/", errorHandle);
app.get("/", (req, res) => {
  res.send("Server is running on port 3k");
});

// listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🔥`);
});
