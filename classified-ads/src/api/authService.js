import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8800/api/auth"; // Backend URL


export const register = async (formData) => {
  try{
    const response = await axios.post(`${API_URL}/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response);
  }
  catch(error){
    console.log(error);
  }
}

export const login = async (idToken) => {
  console.log(idToken);
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
    console.log(error)
  }
}
