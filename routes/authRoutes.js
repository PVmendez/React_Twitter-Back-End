const express = require("express");
const authsRouter = express.Router();
const authController = require("../controllers/authController");
const {CheckDuplicatedUsername} = require("../middlewares/verifySignUp")

authsRouter.post('/register', CheckDuplicatedUsername, authController.singUp);
authsRouter.post('/login', authController.singIn);

module.exports = authsRouter;