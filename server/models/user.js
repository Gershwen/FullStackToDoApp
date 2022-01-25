const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//here we set the requirements for our register and login data
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
