const Tweet = require("../models/Tweet");
const User = require("../models/User");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

const singUp = async (req, res) => {
  console.log(req.body.username)

  const newUser = new User({
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName, 
    age: req.body.age,
    description: req.body.description,
  });

  const saveUser = await newUser.save();

  const token = jwt.sign({ id: saveUser._id }, process.env.TOKEN_KEY, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).json({ token });
};

const singIn = async (req, res) => {
  const userFound = await User.findOne({ userName: req.body.username });
  if (!userFound) {
    console.log(req.body)
    return res.status(400).json({ msg: "User not found" });
  }

  if (!userFound.password === req.body.password) {
    return res.status(401).json({ token: null, msg: "Invalid Password" });
  }
  const token = jwt.sign({ id: userFound._id }, process.env.TOKEN_KEY, {expiresIn: "2h"});
  const datos = {...userFound, token}
  res.json({datos});
};
 
module.exports = {
  singUp,
  singIn,
};
