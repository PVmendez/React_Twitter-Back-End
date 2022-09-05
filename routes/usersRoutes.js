const express = require("express");
const usersRouter = express.Router();
const usersController = require("../controllers/usersController");
// const tweetController = require("../controllers/tweetsController");
// const checkAuthentication = require("../middlewares/checkAuthentication");

usersRouter.get("/users", usersController.index);
usersRouter.get("/users/:userName", usersController.show);
usersRouter.patch("/users/:userName", usersController.update);

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
