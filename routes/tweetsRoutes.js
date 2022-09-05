const express = require("express");
const tweetsRouter = express.Router();
const tweetsController = require("../controllers/tweetsController");

tweetsRouter.get("/tweets", tweetsController.index);
tweetsRouter.get("/tweets/:id", tweetsController.show);

module.exports = tweetsRouter;

