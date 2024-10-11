const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamp: true,
  }
);

const History = mongoose.model("Payment ", HistorySchema);
module.exports = History;
