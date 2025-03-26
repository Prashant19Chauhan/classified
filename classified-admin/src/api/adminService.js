import axios from 'axios'

const API_URL = "http://api.ujalaclassified.com/api/admin"; // Backend URL

export const addUserRole = async(userData) => {
    const response = await axios.post(`${API_URL}/addUser`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    console.log(response);
}

export const adsList = async() => {
    const response = await axios.get(`${API_URL}/adsList`);
    const data = response.data;
    const ads = data.allAds;
    return ads;
}

export const adsApproval = async(data) => {
    console.log(data);
    const response = await axios.post(`${API_URL}/adsApproval`, data, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    console.log(response);
}