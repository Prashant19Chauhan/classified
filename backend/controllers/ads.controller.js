import ads from '../models/Ad.js';
import adsHistory from '../models/adsHistory.js';
import classified from '../models/classified.js';
import adsSchedule from '../models/sheduleAds.js';
import setting from '../models/setting.js';
import { errorHandler } from '../utils/error.js';


// ✅ Create New Ad
export const createAds = async (req, res, next) => {
  try {
    const { creator, title, description, position, duration} = req.body;
    const file = req.file;
    const fileName = file.filename;
    if (!creator || !title || !position || !duration || !file) {
      return next(errorHandler(400, "All required fields must be provided"));
    }

    // Check for existing ad at same position and duration
    const existingAd = await adsSchedule.findOne({ position, duration });
    if (existingAd) {
      return next(errorHandler(409, "An ad already exists for this position and duration"));
    }

    let links = [];

    if (req.body.links) {
      try {
        links = JSON.parse(req.body.links); // ✅ parse back to array
      } catch (err) {
        return res.status(400).json({ success: false, message: "Invalid links format" });
      }
    }

    const parts = position.split("_");

    // Extract values
    const pageNumber = parts[0].split(":")[1]; // "3"
    const layout = parts[1].split(":")[1];     // "2"

    console.log(pageNumber); // "3"
    console.log(layout);     // "2"

    const newAd = new adsSchedule({
      creator,
      title,
      description,
      imageUrl: fileName,
      position,
      pageNumber,
      layout,
      duration,
      links,
    });

    await newAd.save();
    return res.status(201).json({ success: true, message: "Advertisement created successfully." });

  } catch (error) {
    return next(errorHandler(500, "Failed to create advertisement"));
  }
};

// ✅ Get All Classified Ads
export const getAds = async (req, res, next) => {
  try {
    const fetchAds = await classified.find();
    return res.status(200).json(fetchAds);
  } catch (error) {
    return next(errorHandler(500, "Failed to fetch classified ads"));
  }
};

// ✅ Get Ads by User ID
export const fetchadbyUser = async (req, res, next) => {
  try {
    const { userId } = req.body;

    if (!userId || !userId.userId) {
      return next(errorHandler(400, "User ID is required"));
    }

    const creator = userId.userId;

    const [activeAdsData, sheduleAdsData, historyAdsData] = await Promise.all([
      ads.find({ creator }),
      adsSchedule.find({ creator }),
      adsHistory.find({ creator }),
    ]);

    return res.status(200).json({ activeAdsData, sheduleAdsData, historyAdsData });

  } catch (error) {
    return next(errorHandler(500, "Failed to fetch user ads"));
  }
};

// ✅ Get All Active Durations
export const getDuration = async (req, res, next) => {
  try {
    const getData = await setting.find({ status: "Active" });

    if (!getData || getData.length === 0) {
      return next(errorHandler(404, "No active durations found"));
    }

    const durations = getData.flatMap(item => item.durations);
    return res.status(200).json(durations);

  } catch (error) {
    return next(errorHandler(500, "Failed to fetch durations"));
  }
};

// ✅ Get Total Pages for Given Duration
export const getPages = async (req, res, next) => {
  try {
    const { duration } = req.body;

    if (!duration) {
      return next(errorHandler(400, "Duration is required"));
    }

    const getData = await setting.findOne({
      status: "Active",
      "durations.value": duration,
    });

    if (!getData) {
      return next(errorHandler(404, "No matching duration found"));
    }
    const pages = getData.pageLayouts;
    return res.status(200).json(pages);

  } catch (error) {
    return next(errorHandler(500, "Failed to fetch number of pages"));
  }
};

// ✅ Get Already Occupied Pages for Duration
export const getAvailablePages = async (req, res, next) => {
  try {
    const { duration } = req.body;

    if (!duration) {
      return next(errorHandler(400, "Duration is required"));
    }

    const getData = await adsSchedule.find({ duration });

    if (!getData || getData.length === 0) {
      return res.status(200).json([]); // no occupied positions, all available
    }

    const positions = getData.map(item => item.position);
    return res.status(200).json(positions);

  } catch (error) {
    return next(errorHandler(500, "Failed to fetch occupied pages"));
  }
};
