'use server'
import axios from 'axios';
import { unstable_noStore as noStore } from 'next/cache';
export default async function UploaddImages(formData){
    noStore();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bulk_image_upload`, formData);
    return response.data.sucess
}