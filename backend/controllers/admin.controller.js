import AdminUser from '../models/admin.js'
import user from '../models/user.js'
import ads from '../models/Ad.js'
import adsShedule from '../models/sheduleAds.js'
import Classified from '../models/classified.js'
import historyAds from '../models/adsHistory.js'
import setClassified from '../models/setting.js'
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import setting from '../models/setting.js'
import { errorHandler } from '../utils/error.js'
import adsHistory from '../models/adsHistory.js'

// Utility functions
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone); // Indian number
const isValidPassword = (password) =>
  /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,]).{8,}$/.test(password);

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await AdminUser.findOne({ email });
    if (!user) return next(errorHandler(400, "User doesn't exist"));

    if (user.role === "user")
      return next(errorHandler(403, "User not authorized as admin"));

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return next(errorHandler(400, "Invalid credentials!"));

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        message: "Login successful!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
        },
      });
  } catch (err) {
    return next(errorHandler( 500, err.message || "Login failed"));
  }
};

export const addUser = async (req, res, next) => {
  const { name, username, email, phoneNumber, password, role, permissions } = req.body;

  try {
    if (!isValidEmail(email)) return next(errorHandler( 400, "Invalid email format"));
    if (!isValidPhone(phoneNumber)) return next(errorHandler( 400, "Invalid Indian phone number"));
    if (!isValidPassword(password))
      return next(errorHandler( 400, "Password must have 1 uppercase, 1 number, 1 special symbol (.,!@#), min 8 chars"));

    const findUser = await AdminUser.findOne({
      $or: [{ email }, { username }, { phoneNumber }],
    });

    if (findUser) return next(errorHandler(409, "User already exists"));

    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new AdminUser({
      name,
      username,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      permissions,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return next(errorHandler( 500, error.message || "User creation failed"));
  }
};

export const adsList = async (req, res, next) => {
  try {
    const sheduleAds = await adsShedule.find();
    const historyAds = await adsHistory.find();
    
    const allAds = [...sheduleAds, ...historyAds];

    res.status(200).json({ allAds, message: "success" });
  } catch (error) {
    return next(errorHandler(500, "Failed to fetch ads list"));
  }
};

export const adsApproval = async (req, res, next) => {
  try {
    const { id, status, reason } = req.body;
    await adsShedule.updateOne({ _id: id }, { $set: { status, reason } });

    const adsToMoveToHistory = await adsShedule.find({ status: "notApproved" });

    if (adsToMoveToHistory.length > 0) {
      await historyAds.insertMany(adsToMoveToHistory);
      await adsShedule.deleteMany({ status: "notApproved" });
    }

    res.status(200).json({ message: "Status updated and history updated if needed" });
  } catch (error) {
    return next(errorHandler(500, "Error during ads approval"));
  }
};

export const publishClassified = async (req, res, next) => {
      
  try {
    const layout = req.body.layout;
    const duration = req.body.duration;
    const file = req.files.file[0];
    const image = req.files.image[0];
    const newData = new Classified({ layout, file:file.filename, image:image.filename, duration });
    await newData.save();

    await adsShedule.updateMany(
      { duration, status: "approved" },
      { $set: { status: "Active" } }
    );

    const adsToMoveToShow = await adsShedule.find({
      duration,
      status: "Active",
    });

    if (adsToMoveToShow.length > 0) {
      await ads.insertMany(adsToMoveToShow);
      await adsShedule.deleteMany({ duration, status: "Active" });
    }

    await setting.updateOne(
      { "durations.value": duration },
      { $set: { status: "Expired" } }
    );

    res.status(200).json({ message: "Published" });
  } catch (error) {
    return next(errorHandler(500, "Failed to publish classified", ));
  }
};

export const transfertoHistory = async (req, res, next) => {
  try {
    await ads.updateMany({ status: "Active" }, { $set: { status: "Completed" } });

    const adsToMove = await ads.find({ status: "Completed" });

    if (adsToMove.length > 0) {
      await historyAds.insertMany(adsToMove);
      await ads.deleteMany({ status: "Completed" });
    }

    res.status(200).json({ message: "Transferred to history" });
  } catch (error) {
    return next(errorHandler(500, "Failed to transfer to history"));
  }
};

export const classifiedSettings = async (req, res, next) => {
  try {
    const { durations, numberOfPages, pageLayouts } = req.body;

    // Build pageLayoutsArray with layoutType and positions
    const pageLayoutsArray = Object.entries(pageLayouts).map(([pageNumber, layoutType]) => {
      const pageNum = parseInt(pageNumber);
      let positions = [];

      // Generate positions based on layoutType
      switch (layoutType) {
        case "full":
          positions = [{ pageNumber: pageNum, layout: 1 }];
          break;
        case "half":
          positions = [
            { pageNumber: pageNum, layout: 1 },
            { pageNumber: pageNum, layout: 2 },
          ];
          break;
        case "quarter":
          positions = [
            { pageNumber: pageNum, layout: 1 },
            { pageNumber: pageNum, layout: 2 },
            { pageNumber: pageNum, layout: 3 },
            { pageNumber: pageNum, layout: 4 },
          ];
          break;
        case "custom":
          // Leave positions empty or handle as needed
          break;
        default:
          throw new Error(`Invalid layout type: ${layoutType}`);
      }

      return {
        pageNumber: pageNum,
        layoutType,
        positions,
      };
    });

    // Create and save the document
    const settingData = new setClassified({
      durations,
      numberOfPages,
      pageLayouts: pageLayoutsArray,
    });

    await settingData.save();

    res.status(201).json({
      message: "Classified setting saved successfully",
      setting: settingData,
    });
  } catch (error) {
    return next(errorHandler(500, "Failed to save classified settings"));
  }
};



export const getDuration = async (req, res, next) => {
  try {
    const getData = await setting.find({ status: "Active" });
    const durations = getData.flatMap((item) => item.durations);
    res.status(200).json(durations);
  } catch (error) {
    return next(errorHandler( 500, "Failed to fetch durations"));
  }
};

export const getPages = async (req, res, next) => {
  try {
    const { duration } = req.body;
    const getData = await setting.findOne({
      status: "Active",
      "durations.value": duration,
    });

    if (!getData) return next(errorHandler( 404, "No data found for the given duration"));

    res.status(200).json(getData.numberOfPages);
  } catch (error) {
    return next(errorHandler( 500, "Failed to fetch pages"));
  }
};

export const getCreatorInfo = async(req, res) => {
  const creator = req.body;
  const creatorData = await user.findOne({firebaseUID:creator.creatorId})
  res.status(201).json({creatorData});
}


export const userInfo = async(req, res) => {
  const userData = await user.find();
  res.status(201).json({userData})
}

export const classifiedsInfo = async(req, res) => {
  const classifiedsData = await Classified.find();
  res.status(201).json({classifiedsData})
}

export const userAdsInfo = async(req, res) => {
  console.log(req.params.userId)
  const userAds = await ads.find({creator: req.params.userId})
  const userAds1 = await adsShedule.find({creator: req.params.userId})
  const userAds2 = await adsHistory.find({creator: req.params.userId})
  
  const mergedArray = [...userAds, ...userAds1, ...userAds2];
  res.status(200).json({mergedArray});
}
