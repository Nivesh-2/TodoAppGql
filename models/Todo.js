const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  targetDate: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

module.exports = mongoose.model("TodoList", todoSchema);
