const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    periodActive: {
      type: Number,
      default: 3,
    },
    trialActive: {
      type: Date,
    },
    trialExpire: {
      type: Date,
    },
    subscription: {
      type: String,
      enu: ["Trial", "Free", "Basics", "Premium"],
    },
    apiRequestCount: {
      type: Number,
      default: 0,
    },
    monthlyRequestCount: {
      type: Number,
      default: 0,
    },
    nextBillingDate: Date,
    payments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User ", userSchema);
module.exports = User;
