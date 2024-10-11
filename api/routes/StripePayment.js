const express = require("express");
const isAuthenticate = require("../middleware/isAuthenticated");

const openAIRouters = express.Router();

openAIRouters.post("/api/v1/user/stripe", isAuthenticate);

module.exports = openAIRouters;
