const { GoogleGenerativeAI } = require("@google/generative-ai");
const expressAsyncHandler = require("express-async-handler");
const History = require("../models/Contenthistory");
const User = require("../models/User");

const GeminiAI = expressAsyncHandler(async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_API_KEY);

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    // Call the model for text generation
    const response = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      maxOutputTokens: 1,
      tokens: 1,
    });

    const result = await response.generateContent(prompt);
    const data = result.response?.text();

    const newContent = await History.create({
      user: req?.user,
      content: data,
    });

    const userFound = await User.findById(req?.user?._id);
    userFound.history.push(newContent?._id);
    //increase  api count
    userFound.apiRequestCount += 1;
    //save the user
    await userFound.save();
    res.status(200).json({
      message: "Text generation successful",
      data,
    });
  } catch (error) {
    console.error("Error generating text:", error);
    res.status(500).json({ message: "Failed to generate text", error });
  }
});
module.exports = GeminiAI;
