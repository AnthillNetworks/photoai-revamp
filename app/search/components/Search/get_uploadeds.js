'use server'
import { unstable_noStore as noStore } from 'next/cache';
import axios from 'axios';
export async function FetchUploadedData(EventName){
    noStore();
    try {
      const response = await axios.get(`https://selife-bucket.s3.ap-south-1.amazonaws.com/${EventName}/Uploaded_Images.json`);
      return response.data;
    } catch (error) {
      return [];
    }
}