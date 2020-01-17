const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true
  },
  status: { type: String },
  createdAt: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("Room", roomSchema);
