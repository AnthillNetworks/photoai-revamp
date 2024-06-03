'use server'
import React from 'react'
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import Link from 'next/link';
import Style from "../../../../user/[userdata]/[username]/download/page.module.css"
export default async function page({ params }) {
    const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
          secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
        }
      });
      const listParams = {
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Prefix: `${params.event}/Favourites/`
      };
      const response = await s3Client.send(new ListObjectsV2Command(listParams));
      if(response.KeyCount != 0){
        var jpgPngFiles = response.Contents.filter(obj => obj.Key.endsWith('.zip')).map(obj => obj.Key);
      }
  return (
    <div className={Style.MainContent}>
        <div>Total {jpgPngFiles.length} Zip File</div>
        {jpgPngFiles.map((file,index)=>{
            return <div key={index}>
                <Link className={Style.NavBtn} download={`Photos_${index+1}`} target="_blank" href={`https://selife-bucket.s3.ap-south-1.amazonaws.com/${file}`}>Download Photos_{index+1}.zip File </Link>
            </div>
        })}
    </div>
  )
}