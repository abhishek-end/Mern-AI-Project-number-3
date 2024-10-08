const express = require("express");
const userController = require("../controller/userController");

const userRouter = express.Router();

userRouter.post("/api/v1/register", userController.register);
userRouter.post("/api/v1/login", userController.login);

module.exports = userRouter;
