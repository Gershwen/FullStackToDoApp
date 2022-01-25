const mongoose = require("mongoose");
const { dbUri } = require("./config");
//connecting to the database
module.exports = async () => {
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to database.");
};
