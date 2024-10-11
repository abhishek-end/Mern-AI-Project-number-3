const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");

const CheckApiLimit = expressAsyncHandler(async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      status: false,
      message: "Not Authorized",
    });
  }
  // find the user
  const user = await User.findById(req?.user?.id);
  if (!user) {
    return res.status(401).json({
      status: false,
      message: "User not Found",
    });
  }

  let requestLimit = 0;

  if (user?.trialActive) {
    requestLimit = user.monthlyRequestCount;
  }
  if (user?.apiRequestCount >= requestLimit) {
    throw new Error("Limit Quota exceed , Please Subscribe to a plan");
  }
  next();
});
module.exports = CheckApiLimit;
