const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
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

      const userExist = await User.findOne({ email });
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
      newUser.trialExpire = new Date(
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
    // ---- get email and password from user
    const { email, password } = req.body;
    // ---- check for if username and password is get or not
    if (!email || !password) {
      res.status(400).json({
        message: "Username and Password is required ",
      });
    }
    // ---- check for email ----
    const user = await User.findOne({ email });
    // ----check for user----
    if (!user) throw new Error("User not found");
    //---- compare password
    const cpr_password = await bcrypt.compare(password, user?.password);
    // ---- if !compare----password ----
    if (!cpr_password) throw new Error("Wrong  Password");
    // generate token
    const token = jwt.sign({ id: user?._id }, process.env.JWT_TOKEN, {
      expiresIn: "3d",
    });
    // ---- send token to the cookies
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
    });
    // --- send the response
    res.json({
      status: "success",
      _id: user?._id,
      message: "Login Success",
      email: user?.email,
      username: user?.username,
      token,
    });
  }),
  logout: expressAsyncHandler(async (req, res) => {
    // Clear the token cookie
    res.clearCookie("token");
    // Send a success response
    res.status(200).json({ message: "Logout Successfully" });
  }),
  profile: expressAsyncHandler(async (req, res) => {
    const id = req?.user;
    console.log(id);

    const userProfile = await User.findById(id).select("-password");
    if (userProfile) {
      res.status(200).json({
        message: "Profile fetched",
        userProfile,
      });
    }
  }),
};

module.exports = userController;
