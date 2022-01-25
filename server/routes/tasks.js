const Task = require("../models/task");
const User = require("../models/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {jwtSecret} = require("../config");

//post that handles when a new task is added
router.post("/", async (req, res) => {
  const auth = req.headers["authorization"];
  const token = auth.split(" ")[1];
  //jwt token recieved from post is 1st verified
  const decoded = jwt.verify(token, jwtSecret);

  try {
    const username = req.body.user;
    const todo = req.body.text;
    //if the jwt indicates that the name matches the username then the save method will run
    if (decoded.name == username) {
      const task = await new Task({ user: username, task: todo }).save();
      res.send(task);
    } else {
      res
        .status(403)
        .send({ msg: "Your JWT was verified, but you are not an admin." });
    }
  } catch (error) {
    res.send(error);
  }
});

//GET - this get request gets the specific user from the params.
// then uses it to query using the find method
router.get("/:user", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.user });
    res.send(tasks);
  } catch (error) {
    res.send(error);
  }
});

//DELETE - this function get the specific task's id and passes it to the database to get deleted
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    res.send(task);
  } catch (error) {
    res.send(error);
  }
});

//route that handles new user registration
router.post("/register", async (req, res) => {
  try {
    //hashedPassword gets the password from the register form and encrypts it 10 times with bcrypt to produce a hash
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;

    const register = await new User({
      username: username,
      password: hashedPassword,
    }).save();

    res.send(register);
  } catch (error) {
    res.send(error);
  }
});

//route that handles user login

router.post("/login", async (req, res) => {
  //username that comes from the client side gets stored in the usr variable
  const usr = req.body.username;
  //password that comes from the client side gets stored in the pwd variable
  const pwd = req.body.password;

  //below the database gets searced with the usr variable
  const user = await User.findOne({
    username: usr,
  });
  //the boolean value of the admin recieved from the database gets stored in the
  //below variable.

  try {
    //this asynchronous function 1st gets the password from the login page and encrypts it with
    //bcrypt then compares it with the stored hashed password in the database.
    const match = await bcrypt.compare(pwd, user.password);
    const loggedinUser = user.username;
    //this condition checks the match variable. and if theres a password match the payload is created.
    //the payload holds two sets of data, the username and whether admin is true or false
    if (match) {
      payload = {
        name: usr,
      };

      //the jwt is then created using the payload and secret key
      const token = jwt.sign(JSON.stringify(payload), jwtSecret, {
        algorithm: "HS256",
      });

      res.send({ token: token, username: loggedinUser });
    } else {
      res.status(403).send({ err: "Incorrect login!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
