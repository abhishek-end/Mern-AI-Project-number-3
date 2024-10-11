const express = require("express");
const userController = require("../controller/userController");
const isAuthenticate = require("../middleware/isAuthenticated");

const userRouter = express.Router();

userRouter.post("/api/v1/register", userController.register);
userRouter.post("/api/v1/login", userController.login);
userRouter.post("/api/v1/logout", userController.logout);
userRouter.get("/api/v1/profile", isAuthenticate, userController.profile);

module.exports = userRouter;
