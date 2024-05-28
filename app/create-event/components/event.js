'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import axios from "axios";
import { createClient } from '@supabase/supabase-js'
export default async function CreateEvent(eventName,date,month,year,location,brideName,groomName,location_,youtubeLink,mapLink){

    if ( !eventName || !location || !date || !month || !year )
    {return {message:"Please fill all feilds ...",icon:'warning'}}
    noStore();
    const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
        }
    });
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    const DycUserID = UserID.value;
    const result = await supabase.from('UserEvents').insert([
        {
            "UserID": DycUserID,
            "EventDate":`${year}-${month}-${date}`,
            "EventName":`${DycUserID}-${eventName}`,
            "Favourite_Images":[],
            "DigitalInvite": [{
                "bridename":`${brideName}`,
                "groomname":`${groomName}`,
                "location_":`${location_}`,
                "utubelink":`${youtubeLink}`,
                "maplink": `${mapLink}`
            }],
            "Location" : `${location}`,
            "Folders": []
        }]);

    if(result.statusText === "Conflict"){return {message:`Event name should not be same ...`,icon:'warning'}}
    if(result.statusText === "Created"){
        // return {message:`Created ${result.statusText}`,icon:'success'}
        const uploadJaonParams = {
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
            Key: `${DycUserID}-${eventName}/Photograph_Encoded.json`,
            Body: JSON.stringify({}),
            ContentType: 'application/json',
            ACL: 'public-read'
        };
        const respons = await s3Client.send(new PutObjectCommand(uploadJaonParams));
        if(respons.$metadata.httpStatusCode === 200){
            const uploadJaonParam = {
                Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
                Key: `${DycUserID}-${eventName}/Selfie_Encoded.json`,
                Body: JSON.stringify({}),
                ContentType: 'application/json',
                ACL: 'public-read'
            };
            const respons = await s3Client.send(new PutObjectCommand(uploadJaonParam));
            if(respons.$metadata.httpStatusCode === 200){
                const uploadJaonPara = {
                    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
                    Key: `${DycUserID}-${eventName}/WhatsApp_Send_Messages.json`,
                    Body: JSON.stringify([]),
                    ContentType: 'application/json',
                    ACL: 'public-read'
                };
                const respons = await s3Client.send(new PutObjectCommand(uploadJaonPara));
                if(respons.$metadata.httpStatusCode === 200){
                    const uploadJaonPar = {
                        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
                        Key: `${DycUserID}-${eventName}/WhatsApp_UnSend_Messages.json`,
                        Body: JSON.stringify({}),
                        ContentType: 'application/json',
                        ACL: 'public-read'
                    };
                    const respons = await s3Client.send(new PutObjectCommand(uploadJaonPar));
                    if(respons.$metadata.httpStatusCode === 200){
                        const uploadJaonPar = {
                            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
                            Key: `${DycUserID}-${eventName}/Uploaded_Images.json`,
                            Body: JSON.stringify([]),
                            ContentType: 'application/json',
                            ACL: 'public-read'
                        };
                        const respons = await s3Client.send(new PutObjectCommand(uploadJaonPar));
                        if(respons.$metadata.httpStatusCode === 200){return {message:`Event Successfuly created`,icon:'success',EventName:`${DycUserID}-${eventName}`}}
                    }
                }
            }
        }
        // const formData = new FormData();
        // formData.append('folderName', `${DycUserID}-${title}`);
        // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create_folder`, formData);
        // return {message:`Event Successfuly created`,icon:'success',EventName:`${DycUserID}-${title}`}
    }
    return {message:`Something went wrong... ${result.statusText}`,icon:'warning'}
}