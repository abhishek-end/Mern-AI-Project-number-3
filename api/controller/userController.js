const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const userController = {
  register: expressAsyncHandler(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if all required fields are provided
      if (!username || !email || !password) {
        return res.status(400).json({
          // Use 400 for bad requests
          status: false,
          message: "Username, Email, and Password are required",
        });
      }

      const userExist = User.findOne({ email });
      if (userExist) {
        res.status(400).json({
          status: false,
          message: "User already exist",
        });
      }
      // Generate salt for hashing
      const salt = await bcrypt.genSalt(10);
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        periodActive: 3, // Default value for periodActive
      });

      // Set trial expiration date
      newUser.trialActive = new Date(
        new Date().getTime() + newUser.periodActive * 24 * 60 * 60 * 1000
      );

      // Save the new user to the database
      await newUser.save();

      res.status(201).json({
        status: true,
        message: "Registered Account",
        user: {
          username,
          email,
        },
      });
    } catch (error) {
      console.error(error, "register error");
      res.status(500).json({
        status: false,
        message: "An error occurred during registration",
      });
    }
  }),

  login: expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        message: "Username and Password is required ",
      });
    }
    const cpr_password = User.compare(password);
  }),
};

module.exports = userController;
