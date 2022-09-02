const express = require("express");
const publicRouter = express.Router();
// const checkAuthentication = require("../middlewares/checkAuthentication");
// const pagesController = require("../controllers/pagesController");
const tweetsController = require("../controllers/tweetsController");
// const passport = require("passport");

// publicRouter.get("/", pagesController.prueba);
publicRouter.get("/tweets", tweetsController.index);
publicRouter.get("/tweets/:id", tweetsController.show);
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

module.exports = publicRouter;
