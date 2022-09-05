const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/usersController");
const passport = require("passport");
const jwt = require("jsonwebtoken")
// const tweetController = require("../controllers/tweetsController");
// const checkAuthentication = require("../middlewares/checkAuthentication");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader)
  console.log("token", token)
  if(!token) {
    return res.status(401).send("Token required");
  }
  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if(err) {
      return res.status(403).send("invalid token");
    }
    req.user = user;
    next();
  })
}

usersRouter.get("/users", usersController.index);
usersRouter.get("/users/:userName", verifyToken, usersController.show);

// userRouter.post("/createTweet", tweetController.store);
// userRouter.get("/tweet/:tweetId/like", tweetController.like);
// userRouter.get("/tweet/:tweetId/dislike", tweetController.dislike);

// userRouter.get("/user/:userName", userController.show);
// userRouter.get("/user", userController.search);

// userRouter.post("/:id/follow/", userController.follow);
// userRouter.post("/:id/unfollow/", userController.unfollow);

// userRouter.get("/user/:id/followers", userController.showFollowers);
// userRouter.get("/user/:id/following", userController.showFollowing);

// userRouter.get("/:userName/:tweetId", tweetController.show);
// userRouter.post("/:userName/:tweetId/delete", tweetController.destroy);

module.exports = usersRouter;
