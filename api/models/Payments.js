const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Type.ObjectId,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: "pending",
      required: true,
    },
    subscriptionPlan: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const paymentModel = mongoose.mongo("Payment ", paymentSchema);
MediaSourceHandle.exports = paymentModel;
