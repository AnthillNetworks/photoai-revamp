"use client";
import axios from 'axios';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import React, { useState } from 'react';

function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
    },
  });

  // const handleClick = async () => {
  //   if (selectedFiles.length === 0) {
  //     console.error('Please select files to compress');
  //     return;
  //   }

  //   const formData = new FormData();
  //   for (let i = 0; i < selectedFiles.length; i++) {
  //     formData.append(`files`, selectedFiles[i]);
  //   }
  //   console.log(selectedFiles[0])

  //   // formData.append("file", selectedFiles[0]);

  //   const res = await fetch("/api/newcompress", {
  //     method: "POST",
  //     body: formData,
  //   });
  
  //   const data = await res.json();
  //   console.log(data.status)

  //   if (data.status === 201) {
  //   console.log(data);
  //   const compressedFiles = data.compressedFiles;

  //   // Use Promise.all to upload all files concurrently
  //   const uploadPromises = compressedFiles.map(async (file) => {
  //     const compressedBase64 = file.compressedImage;
  //     const byteCharacters = atob(compressedBase64);
  //     const byteNumbers = new Array(byteCharacters.length);
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     const compressedImageBlob = new Blob([byteArray], { type: 'image/jpeg' });

  //     const uniqueFileName = new Date()
  //       .toISOString()
  //       .replace(/[-:.]/g, "")
  //       .replace("T", "_");
  //     const uploadCommand = new PutObjectCommand({
  //       Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  //       Key: `/NEW_COMPRESS_IMAGE/${uniqueFileName}.jpg`,
  //       Body: compressedImageBlob,
  //       ACL: "public-read",
  //     });
  //     const respo = await s3Client.send(uploadCommand);
  //     console.log(respo.$metadata.httpStatusCode, "Status");
  //     return respo;
  //   });

  //   // Wait for all uploads to complete
  //   const uploadResults = await Promise.all(uploadPromises);
  //   console.log('All uploads completed:', uploadResults);
  // }

  // };

  const handleClick = async () => {
    if (selectedFiles.length === 0) {
      console.error('Please select files to compress');
      return;
    }
  
    const BATCH_SIZE = 5; // Number of files to process in each batch
  
    // Convert FileList to array
    const filesArray = Array.from(selectedFiles);
  
    // Function to convert base64 to Blob
    const base64ToBlob = (base64, contentType) => {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    };
  
    // Function to upload a single file to S3
    const uploadToS3 = async (file) => {
      const compressedImageBlob = base64ToBlob(file.compressedImage, 'image/jpeg');
      const uniqueFileName = new Date().toISOString().replace(/[-:.]/g, "").replace("T", "_");
      const uploadCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: `farzin-Bride_to_be/COMPRESS_IMAGES/bride photos/${uniqueFileName}.jpg`,
        Body: compressedImageBlob,
        ACL: "public-read",
      });
      const respo = await s3Client.send(uploadCommand);
      console.log(respo.$metadata.httpStatusCode, "Status");
      return respo;
    };
  
    // Function to handle a single batch of files
    const handleBatch = async (batchFiles) => {
      const formData = new FormData();
      batchFiles.forEach(file => formData.append('files', file));
  
      const res = await fetch("/api/newcompress", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      console.log(data.status);
  
      if (data.status === 201) {
        const compressedFiles = data.compressedFiles;
  
        // Use Promise.all to upload all files concurrently
        const uploadPromises = compressedFiles.map(uploadToS3);
  
        // Wait for all uploads to complete
        const uploadResults = await Promise.all(uploadPromises);
        console.log('All uploads completed:', uploadResults);
      } else {
        console.error('Failed to compress files:', data);
      }
    };
  
    // Split the selected files into batches and process each batch sequentially
    for (let i = 0; i < filesArray.length; i += BATCH_SIZE) {
      const batchFiles = filesArray.slice(i, i + BATCH_SIZE);
      await handleBatch(batchFiles); // Wait for the batch to complete before proceeding to the next batch
    }
  
    console.log('All batches processed and uploaded');
  };
  

  return (
    <div className="image-upload">
      <input type="file" multiple onChange={handleFileChange} />
      <button type="button" onClick={handleClick}>Compress Images</button>
    </div>
  );
}

export default ImageUpload;



// LOOPING


// if (data.status === 201) {
//   console.log(data);
//   const compressedFiles = data.compressedFiles;

//   for (const file of compressedFiles) {
//     const compressedBase64 = file.compressedImage;
//     const byteCharacters = atob(compressedBase64);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const compressedImageBlob = new Blob([byteArray], { type: 'image/jpeg' });
    
//     const uniqueFileName = new Date()
//       .toISOString()
//       .replace(/[-:.]/g, "")
//       .replace("T", "_");
//     const uploadCommand = new PutObjectCommand({
//       Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
//       Key: `/NEW_COMPRESS_IMAGE/${uniqueFileName}.jpg`,
//       Body: compressedImageBlob,
//       ACL: "public-read",
//     });
//     const respo = await s3Client.send(uploadCommand);
//     console.log(respo.$metadata.httpStatusCode, "Status");
//   }

//   // const compressedBase64 = data.compressedImage;
//   // const byteCharacters = atob(compressedBase64);
//   // const byteNumbers = new Array(byteCharacters.length);
//   // for (let i = 0; i < byteCharacters.length; i++) {
//   //   byteNumbers[i] = byteCharacters.charCodeAt(i);
//   // }
//   // const byteArray = new Uint8Array(byteNumbers);
//   // const compressedImageBlob = new Blob([byteArray], { type: 'image/jpeg' });
  
//   // const uniqueFileName = new Date()
//   //   .toISOString()
//   //   .replace(/[-:.]/g, "")
//   //   .replace("T", "_");
//   // const uploadCommand = new PutObjectCommand({
//   //   Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
//   //   Key: `/NEW_COMPRESS_IMAGE/${uniqueFileName}.jpg`,
//   //   Body: compressedImageBlob,
//   //   ACL: "public-read",
//   // });
//   // const respo = await s3Client.send(uploadCommand);
//   // console.log(respo.$metadata.httpStatusCode,"Status")
// }