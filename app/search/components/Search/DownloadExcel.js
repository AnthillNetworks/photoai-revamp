import { createClient } from '@supabase/supabase-js'
// import * as XLSX from 'xlsx';
import { S3Client, ListObjectsV2Command,PutObjectCommand } from '@aws-sdk/client-s3';
import axios from 'axios';
import downloadCSV from '@/app/crm/Components/Home/DownloadCSV';
export default async function DownloadExcel(EventName) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const SelfieDatas = await supabase.from('UserEvents').select('SelfieData').eq("EventName", `${EventName}`);
    let existingSelfieData = SelfieDatas.data[0].SelfieData;
   // by jitender
   const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
    }
});
const listParams = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Prefix: `${EventName}/selfie/`
};
   const response = await s3Client.send(new ListObjectsV2Command(listParams));
   const numbers = [];
   if (response.Contents.length !== 0) {
       const jpgPngFiles = response.Contents.filter(obj => obj.Key.endsWith('.json')).map(obj => obj.Key);
       for (let a = 0; a < jpgPngFiles.length; a++) {
           const data = await axios.get(`https://selife-bucket.s3.ap-south-1.amazonaws.com/${jpgPngFiles[a]}`);
           const num = data.data.phno;
           if(num.length === 10){
                numbers.push({"User_Name":data.data.name,User_Mobile_Number:num,User_Email_Id:data.data.email,User_Photos:``});
           }
       }
   }
   downloadCSV(numbers);
}
