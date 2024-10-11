const express = require("express");
const isAuthenticate = require("../middleware/isAuthenticated");
const GeminiAI = require("../controller/openAIController");
const CheckApiLimit = require("../middleware/CheckApiLimit");
// const openAI = require("../controller/openAIController");

const openAIRouters = express.Router();

openAIRouters.post(
  "/api/v1/user/content-gen",
  isAuthenticate,
  CheckApiLimit ,
  GeminiAI
);

module.exports = openAIRouters;
