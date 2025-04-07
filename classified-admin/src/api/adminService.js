import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : "http://localhost:8800"}/api/admin`;

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

export const publishClassified = async(formData) => {
    const response = await axios.post(`${API_URL}/publish`, formData, {
        headers: {
            "Content-Type" : "application/json",
        },
    })
    const data = await response.data;
    return data;
}

export const setClassified = async(durations, numberOfPages, pageLayouts) => {
    console.log(durations);
    const response = await axios.post(`${API_URL}/settings`, {durations, numberOfPages, pageLayouts}, {
        headers: {
            "Content-Type" : "application/json",
        }
    })
    return await response.data;
}

export const fetchDuration = async() => {
    const response = await axios.get(`${API_URL}/getDuration`);
    return await response.data;
}

export const fetchpages = async(duration) => {
    const response = await axios.post(`${API_URL}/getPages`, {duration}, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.data;
}
