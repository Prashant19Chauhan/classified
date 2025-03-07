import axios from "axios";

const API_URL = "http://localhost:5000/api/admin/auth"; // Backend URL

export const login = async(formData) => {
    try{
        const response = await axios.post(`${API_URL}/login`, formData, {
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