'use server'
import axios from "axios"
export async function FetchUserData(EventName,username){
    const formData = new FormData();
    formData.append('name', username);
    formData.append('eventName', EventName);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-image`, formData);
    const profile = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-profile`, formData);
    return {'data':response.data.sucess,'profile':profile.data.sucess};
}