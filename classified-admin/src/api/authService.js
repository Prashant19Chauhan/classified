import axios from "axios";

const API_URL = "http://api.ujalaclassified.com/api/admin"; // Backend URL

export const login = async(formData) => {
    try{
        const response = await axios.post(`${API_URL}/login`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.data
        return data;
    }
    catch(error){
        console.log(error);
    }
}