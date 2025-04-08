import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "http://localhost:8800"}/api/auth`;


export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Something went wrong during registration"
    );
  }
};



export const login = async (idToken) => {
  try{
    const response = await axios.post(`${API_URL}/login`, {idToken:idToken}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = response.data;
    return data;
    
  }
  catch(error){
    return error
  }
}
