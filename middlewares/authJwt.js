const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");

const verifyToken = async (req, res, next) => {
  console.log(res)
    const token = res.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ msg: "No token provied" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ msg: "no user found" });
    } 
    next(); 

};

module.exports = verifyToken;
