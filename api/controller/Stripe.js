const expressAsyncHandler = require("express-async-handler");

const Stripe = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
});

module.exports = Stripe;
