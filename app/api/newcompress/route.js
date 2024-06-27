import sharp from 'sharp';
import { NextResponse } from 'next/server';

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '100mb',
//     },
//   },
//   // Specifies the maximum allowed duration for this function to execute (in seconds)
//   maxDuration: 5000,
// }

export const maxDuration = 60

export const POST = async (req, res) => {
  const formData = await req.formData();
  console.log(formData);

  const files = formData.getAll("files"); // Get all files
  if (files.length === 0) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  try {
    const compressedFilesPromises = files.map(async (file) => {
      console.log(`Processing file: ${file.name}`);

      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = file.name.replaceAll(" ", "_");

      const compressedBuffer = await compressImage(buffer);
      const compressedBase64 = compressedBuffer.toString('base64');

      return {
        filename: filename,
        size: file.size,
        compressedImage: compressedBase64
      };
    });

    const compressedFiles = await Promise.all(compressedFilesPromises);

    // Return the array of compressed images as a response
    return NextResponse.json({ message: "Success", status: 201, compressedFiles });

  } catch (error) {
    console.log("Error occurred while compressing", error);
    return NextResponse.json({ message: "Failed", status: 500 });
  }
}

async function compressImage(buffer) {
  const compressedBuffer = await sharp(buffer)
    .jpeg({ quality: 80 })
    .toBuffer();
  console.log(compressedBuffer);
  return compressedBuffer;
}



// import path from "path";
// import { writeFile } from "fs/promises";
// import multer from 'multer';
// import sharp from 'sharp';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextResponse } from 'next/server';

// export const POST = async (req, res) => {
//   const formData = await req.formData();
//   console.log(formData)
//   const files = formData.get("files");
//   // console.log("FILES",files)
//   // const file = formData.get("file");
//   // // console.log("FILE",file)
//   if (!file) {
//     return NextResponse.json({ error: "No files received." }, { status: 400 });
//   }

//   for (let [name, value] of formData.entries()) {
//     console.log(`Field Name: ${name}`);
//     if (Array.isArray(value)) {
//         value.forEach((file, index) => {
//             console.log(`File ${index + 1}:`, file);
//         });
//     } else {
//         console.log(`File:`, value);
//     }
//   }

//   const buffer = Buffer.from(await file.arrayBuffer());
//   const filename = file.name.replaceAll(" ", "_");
//   console.log(filename);
//   console.log(file.size)
//   try {
//     const compressedBuffer = await compressImage(buffer);
//     const compressedBase64 = compressedBuffer.toString('base64');
//     // Return the compressed image as a base64 string to the frontend
//     return NextResponse.json({ message: "Success", status: 201, size:file.size , filename, compressedImage: compressedBase64 });

//   } catch (error) {
//     console.log("Error occurred", error);
//     return NextResponse.json({ message: "Failed", status: 500 }); 
//   }
// }

// async function compressImage(buffer) {
//   const compressedBuffer = await sharp(buffer)
//     .jpeg({ quality: 80 })
//     .toBuffer();
//   console.log(compressedBuffer);
//   return compressedBuffer;
// }



// Define the path and filename for the compressed image file
// const compressedFilename = `compressed_${filename}`;
// const compressedFilePath = path.join(process.cwd(), "public/assets", compressedFilename);

// // Ensure the directory exists
// const dirPath = path.join(process.cwd(), "public/assets");
// // await mkdir(dirPath, { recursive: true });

// // Write the compressed buffer directly to an image file
// await writeFile(compressedFilePath, compressedBuffer);
