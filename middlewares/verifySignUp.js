const User = require("../models/User");

const CheckDuplicatedUsername = async (req, res, next) => {

  const userFound = await User.findOne({userName: req.body.username});
  if(userFound) {
    return res.status(400).json({msg: "The user already exists"})
  }

  next();
}

module.exports = {CheckDuplicatedUsername};