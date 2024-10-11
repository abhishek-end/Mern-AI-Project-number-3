const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticate = expressAsyncHandler(async (req, res, next) => {
  const tokens = req.cookies.token;
  if (tokens) {
    const decode = jwt.verify(tokens, process.env.JWT_TOKEN);
    req.user = await User.findById(decode?.id).select("-password");
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized User or Invalid Token ",
    });
  }
});

module.exports = isAuthenticate;
