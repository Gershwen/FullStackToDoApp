const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//here we set the requirements for our todo list items
const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("task", taskSchema);
