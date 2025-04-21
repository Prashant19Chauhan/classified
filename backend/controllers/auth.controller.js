import admin from "firebase-admin";
import User from '../models/user.js';
import { errorHandler } from "../utils/error.js";

// Email, password, and phone validation functions
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPassword = (password) =>
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.])[A-Za-z\d!@#$%^&*.]{6,}$/.test(password);
const isValidPhoneNumber = (number) => /^[6-9]\d{9}$/.test(number);  // Indian mobile numbers

export const register = async (req, res, next) => {
  console.log(req.body)
  try {
    const { name, email, username, password, phoneNumber, confirmPassword } = req.body;

    // Field presence check
    if (!name || !email || !username || !password || !phoneNumber) {
      return next(errorHandler(400, "All fields are required"));
    }

    // Email format check
    if (!isValidEmail(email)) {
      return next(errorHandler(400, "Invalid email format"));
    }

    // Password format check
    if (!isValidPassword(password)) {
      return next(errorHandler(400, "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character"));
    }

    // Phone number check
    if (!isValidPhoneNumber(phoneNumber)) {
      return next(errorHandler(400, "Invalid Indian phone number"));
    }
 
    // Uniqueness check
    const existingUser = await User.findOne({ $or: [{ email }, { username }, { phoneNumber }] });
    if (existingUser) {
      return next(errorHandler(400, "Email, username or phone number already in use"));
    }

    // Firebase user creation
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
    });

    const newUser = new User({
      firebaseUID: firebaseUser.uid,
      name,
      email,
      username,
      phoneNumber,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully", userId: firebaseUser.uid, success: true });

  } catch (error) {
    console.error("Error in register:", error);
    return next(errorHandler(500, "Internal server error"));
  }
};



export const login = async (req, res, next) => {
    try {
      const { idToken } = req.body;
  
      if (!idToken) {
        return next(errorHandler(400, "ID token is required"));
      }
  
      // Verify the Firebase ID token
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const { uid } = decodedToken;

  
      // Find user in MongoDB
      const findUser = await User.findOne({ firebaseUID: uid });
  
      if (!findUser) {
        return next(errorHandler(404, "User not found in database"));
      }
  
      // Send token in HTTP-only cookie
      return res
        .status(200)
        .cookie("access_token", idToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        })
        .json({
          message: "Login successful",
          user: findUser,
          success: true,
        });
  
    } catch (error) {
      console.error("Error in login:", error);
  
      if (error.code === "auth/user-not-found") {
        return next(errorHandler(401, "User not found"));
      } else if (error.code === "auth/wrong-password") {
        return next(errorHandler(401, "Incorrect password"));
      }
  
      return next(errorHandler(500, "Internal server error"));
    }
  };