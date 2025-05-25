// import User from "../models/users.models.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { validationResult } from "express-validator";

// // User Registration Controller
// export const registerUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { name, contact_number, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ contact_number });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = new User({
//       name,
//       contact_number,
//       password,
//     });

//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// // User Login Controller
// export const loginUser = async (req, res) => {
//   const { contact_number, password } = req.body;

//   try {
//     const user = await
//       User.findOne({ contact_number });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }
//     const token = await user.generateAuthToken();
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });
//     res.status(200).json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         name: user.name,
//         contact_number: user.contact_number,
//       },
//     });
//   }
//   catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// }
// // Fetch User Details Controller
// export const getUserDetails = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password -tokens");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// }
// // Logout User Controller
// export const logoutUser = async (req, res) => {
//   try {
//     req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
//     await req.user.save();
//     res.clearCookie("token");
//     res.status(200).json({ message: "Logout successful" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// }
// // Middleware to authenticate user
// export const authenticateUser = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     const user = await User.findById(decoded._id
//     ).select("-password -tokens");
//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     req.user = user;
//     req.token = token;
//     next();
//   }
//   catch (error) {
//     res.status(401).json({ message: "Unauthorized", error: error.message });
//   }
// }
