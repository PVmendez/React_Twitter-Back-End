const express = require("express");
const tweetsRouter = express.Router();
const tweetsController = require("../controllers/tweetsController");

tweetsRouter.get("/tweets", tweetsController.index);
tweetsRouter.get("/tweets/:id", tweetsController.show);

module.exports = tweetsRouter;

// const checkAuthentication = require("../middlewares/checkAuthentication");
// const pagesController = require("../controllers/pagesController");
// const passport = require("passport");

// publicRouter.get("/home", checkAuthentication, pagesController.home);

// publicRouter.get("/login", pagesController.login);
// publicRouter.post(
//   "/login",
//   passport.authenticate("login", {
//     successRedirect: "/home",
//     failureRedirect: "/login",
//   })
// );

// publicRouter.get("/register", pagesController.register);
// publicRouter.post(
//   "/register",
//   passport.authenticate("register", {
//     successRedirect: "/home",
//     failureRedirect: "/register",
//   })
// );

// publicRouter.get("/logout", pagesController.logout);
