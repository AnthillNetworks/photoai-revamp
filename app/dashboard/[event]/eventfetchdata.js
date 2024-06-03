'use server'
import axios from "axios"
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@supabase/supabase-js'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
    }
});
export async function FetchDashboardData(EventName){
    noStore();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    // const formData = new FormData();
    // formData.append('eventName', EventName);
    // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-image`, formData);
    const result = await supabase.from('UserEvents').select('Favourite_Images').eq("EventName",`${EventName}`);
      const listParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        MaxKeys: 20,
        ContinuationToken: null,
        Prefix: `${EventName}/photographers_images/`
      };
      try {
        const FetchedImages = await s3Client.send(new ListObjectsV2Command(listParams));
        const fetchedImages = FetchedImages.Contents.map(obj => obj.Key).filter((key)=>{if(key != `${EventName}/photographers_images/`){return key}});
        return [fetchedImages,result.data[0].Favourite_Images]
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    // return [response.data.sucess,result.data[0].Favourite_Images];
}
export async function FetchExploreData(EventName){
    noStore();
    const formData = new FormData();
    formData.append('eventName', EventName);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get-names`, formData);
    return response.data.sucess;
}
// export async function FetchFavourateData(AllSupaFavourite){
//     noStore();
//     const formData = new FormData();
//     if(AllSupaFavourite.length == 0){
//         return [];
//     }
//     // for(let i = 0;i<AllSupaFavourite.length;i++){
//     //     formData.append("keys",AllSupaFavourite[i]);
//     // }
//     // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/get_favourites`, formData);
//     return response.data.sucess;
// }
export async function FetchSupabaseFavourateData(Array,EventName){
    noStore();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const data = await supabase.from('UserEvents').update({ 'Favourite_Images': Array }).eq('EventName', `${EventName}`).select('Favourite_Images');
    return data.data[0].Favourite_Images;
}


export async function FetchExploreSelfieData(EventName,name){
  noStore();
  try {
    const response = await axios.get(`https://selife-bucket.s3.ap-south-1.amazonaws.com/${EventName}/Output/${name}/Data.json`);
    return response.data.map(obj => `${EventName}/photographers_images/${obj}`);
  } catch (error) {
    return [];
  }
}