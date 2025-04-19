import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8800"}/api/ads`;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

// ✅ Create Ad
export const createAds = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/createAds`, formData, config);
    const { status, data } = response;

    if (status === 200 || status === 201) {
      return {
        success: true,
        data,
        message: "Ad created successfully",
      };
    }

    return {
      success: false,
      message: "Unexpected server response",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error?.response?.data?.message || "Something went wrong while creating the ad.",
    };
  }
};

// ✅ Get All Classified Ads
export const getAds = async () => {
  try {
    const response = await axios.get(`${API_URL}/getAds`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch ads");
  }
};

// ✅ Get Ad by ID
export const fetchadbyId = async (id) => {
  try {
    const response = await axios.post(`${API_URL}/getAdsbyId`, id, config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch ad by ID");
  }
};

// ✅ Get Ads by User
export const fetchAdsByUser = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/getAdsbyUser`, { userId }, config);
    return response.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Failed to fetch ads by user"
    );
  }
};

// ✅ Get Available Durations
export const fetchDuration = async () => {
  try {
    const response = await axios.get(`${API_URL}/getDuration`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch durations");
  }
};

// ✅ Get Total Pages for Given Duration
export const fetchpages = async (duration) => {
  try {
    const response = await axios.post(`${API_URL}/getPages`, { duration }, config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch pages");
  }
};

// ✅ Get Occupied Page Positions
export const fetchAvailablePages = async (duration) => {
  try {
    const response = await axios.post(`${API_URL}/availablePage`, { duration }, config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch available pages");
  }
};

export const fetchBookings = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/booking/list`);
    console.log(response.data); // Handle the data as needed
  } catch (error) {
    console.error('Error fetching bookings:', error);
  }
};

export const sendMessage = async (messageData) => {
  try {
    const response = await axios.post(`${API_URL}/api/contact/sendMessage`, messageData);
    console.log(response.data); // Handle the success response
  } catch (error) {
    console.error('Error sending message:', error);
  }
};