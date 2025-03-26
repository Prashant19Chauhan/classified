import axios from "axios";

const API_URL = "http://localhost:8800/api/ads"

export const createAds = async(formData) => {
    console.log(formData)
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

export const fetchadbyId = async(id) => {
    try{
        const response = await axios.post(`${API_URL}/getAdsbyId`, id, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.data;
        return data;
    }
    catch(error){
        console.log(error);
    }

}

export const fetchAdsByUser = async(userId) => {
    try{
        const response = await axios.post(`${API_URL}/getAdsbyUser`, userId, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.data;
        return data;
    }
    catch(error){
        console.log(error);
    }
}

export const fetchAvailablePosition = async({startDate, endDate}) => {

    try{
        const response = await axios.post(`${API_URL}/getAvailableposition`, {startDate, endDate}, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.data;
        return data;
    }
    catch(error){
        console.log(error);
    }
}