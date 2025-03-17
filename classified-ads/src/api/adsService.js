import axios from "axios";

const API_URL = "http://localhost:5000/api/ads"

export const createAds = async(formData) => {
    try{
        const response = await axios.post(`${API_URL}/createAds`, formData, {
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

export const getAds = async() => {
    const response = await axios.get(`${API_URL}/getAds`);
    const data = await response.data;
    return data;
}