import axios from 'axios'

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:8800"}/api/admin`;

export const addUserRole = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/addUser`, userData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Add User Role Error:", error?.response?.data || error.message);
        throw error;
    }
};

export const adsList = async () => {
    try {
        const response = await axios.get(`${API_URL}/adsList`);
        return response.data?.allAds || [];
    } catch (error) {
        console.error("Ads List Error:", error?.response?.data || error.message);
        throw error;
    }
};

export const adsApproval = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/adsApproval`, data, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Ads Approval Error:", error?.response?.data || error.message);
        throw error;
    }
};

export const publishClassified = async (formData) => {
    const data = new FormData();
    data.append("layout", formData.layout);
    data.append("duration", formData.duration);
    data.append("file", formData.file);
    data.append("image", formData.image);

    try {
        const response = await axios.post(`${API_URL}/publish`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Publish Classified Error:", error?.response?.data || error.message);
        throw error;
    }
};

export const setClassified = async (durations, numberOfPages, pageLayouts) => {
    console.log(pageLayouts, numberOfPages)
    try {
        const response = await axios.post(`${API_URL}/settings`, {
            durations,
            numberOfPages,
            pageLayouts,
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error("Set Classified Error:", error?.response?.data || error.message);
        throw error;
    }
};

export const fetchDuration = async () => {
    try {
        const response = await axios.get(`${API_URL}/getDuration`);
        return response.data;
    } catch (error) {
        console.error("Fetch Duration Error:", error?.response?.data || error.message);
        throw error;
    }
};

export const fetchpages = async (duration) => {
    try {
        const response = await axios.post(`${API_URL}/getPages`, { duration }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Fetch Pages Error:", error?.response?.data || error.message);
        throw error;
    }
};



export const getUsers = async () => {
    const res = await fetch(`${API_URL}/users`);
    return res.json();
  };
  
  export const getUserAds = async (userId) => {
    const res = await fetch(`${API_URL}/admin/user-ads/${userId}`);
    return res.json();
  };
  
  export const getClassifieds = async () => {
    const res = await fetch(`${API_URL}/admin/classifieds`);
    return res.json();
  };
  
  export const deleteClassified = async (id) => {
    await fetch(`${API_URL}/admin/classifieds/${id}`, { method: 'DELETE' });
  };
  
  export const getOffers = async () => {
    const res = await fetch(`${API_URL}/admin/offers`);
    return res.json();
  };
  
  export const createOffer = async (offerData) => {
    await fetch(`${API_URL}/admin/offers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offerData),
    });
  };
  
  export const deleteOffer = async (id) => {
    await fetch(`${API_URL}/admin/offers/${id}`, { method: 'DELETE' });
  };
  

  export const fetchCreatorDetails = async(creatorId) => {
    const response = await axios.post(`${API_URL}/creatorInfo`, {creatorId}, {
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = response.data;
    return data.creatorData;
  }
