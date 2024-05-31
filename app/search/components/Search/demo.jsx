'use client'
import { useState,useRef } from "react";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
export default function Search(){
    let form = useRef(null)
    const [upload,uploadvalue] = useState([]);
    const UploadImages = async (e) => {
        e.preventDefault();
        const s3Client = new S3Client({
            region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
            credentials: {
              accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
              secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
            }
        });
        for (let i = 0; i < upload.length; i++) {
          const uploadCommand = new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
            Key: `image_${i}.jpg`,
            Body: upload[i],
            ACL: 'public-read'
          });
          try {
            const response = await s3Client.send(uploadCommand);
            console.log("Uploaded ...",response)
          } catch (error) {
            alert('Error uploading file');
          }
        }
    };
    
    return(
        <>
            <form onSubmit={UploadImages} ref={form} enctype="multipart/form-data">
                <div>
                    <div>Select To Upload</div>
                    <div onClick={()=>{inputboxvalue(false)}}>&#x2716;</div>
                </div>
                <input type="file" name="Image_Files" multiple required onChange={(e)=>{uploadvalue(e.target.files)}}/>
                <button type="submit">Upload</button>
            </form>
        </>
    )
}