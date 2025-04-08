import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "http://localhost:8800"}/api/admin`;


export const login = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      // Forward error to frontend to handle
      throw error.response?.data || { message: "Server error" };
    }
  };