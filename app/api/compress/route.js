import multer from 'multer';
import sharp from 'sharp';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.array('files'); // Expect multiple files

const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export async function POST(req, res) {
  try {
    await runMiddleware(req, res, uploadMiddleware); // Apply multer middleware
    const files = await req.formData();

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    console.log('Uploaded files:', files);
    for (const file of files) {
      // console.log(file)
      // console.log(file[1].name,"?")
      console.log(`  - ${file[1].name} (${file[1].size} bytes)`);
      console.log(file[1].buffer)
    }

    const compressedImages = await Promise.all(
      files.map(async (file) => {
        const compressedBuffer = await compressImage(file[1].buffer);
        return {
          name: file[1].name,
          data: compressedBuffer.toString('base64'),
        };
      })
    );

    return NextResponse.json({
      status: 200,
      message: compressedBuffer.toString('base64')
    });

  } catch (error) {
    console.error('Error processing images:', error);
    return NextResponse.json({
      status: 500,
      message: 'Image processing failed'
    });
  }
}

async function compressImage(buffer) {
  const compressedBuffer = await sharp(buffer)
    .jpeg({ quality: 80 })
    .toBuffer();
  console.log(compressedBuffer)
  return compressedBuffer;
}




// BUS BOY
// import { NextResponse } from 'next/server';
// import Busboy from 'busboy'; // Import directly (no need for default import)
// import sharp from 'sharp';
// // const Busboy = require('busboy');

// export const config = {
//   api: {
//     bodyParser: false, 
//   },
// };

// export async function POST(req, res) {
//   const busboy = new Busboy({ headers: req.headers });
//   const files = [];

//   busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//     const buffers = [];
//     file.on('data', (data) => {
//       buffers.push(data);
//     });
//     file.on('end', () => {
//       const buffer = Buffer.concat(buffers);
//       files.push({ buffer, filename });
//     });
//   });

//   busboy.on('finish', async () => {
//     try {
//       const compressedImages = await Promise.all(
//         files.map(async (file) => {
//           const compressedBuffer = await compressImage(file.buffer);
//           return {
//             name: file.filename,
//             data: compressedBuffer.toString('base64'),
//           };
//         })
//       );

//       console.log(compressedImages)
//       return NextResponse.json({
//         status: 200,
//       },  { 
//         data:"Data"
//       });
//     } catch (error) {
//       console.error('Error compressing images:', error);
//       return NextResponse.json({ error: 'Error compressing the images' }, { status: 500 });
//     }
//   });

//   req.pipe(busboy);
// }

// async function compressImage(buffer) {
//   const compressedBuffer = await sharp(buffer)
//     .jpeg({ quality: 80 })
//     .toBuffer();
//   console.log(compressedBuffer)
//   return compressedBuffer;
// }




//  /pages/api/compress.js
// import multer from 'multer';
// import { createRouter } from 'next-connect';
// import { NextResponse } from 'next/server';
// import sharp from 'sharp';

// // Configure Multer storage
// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// // Create a nextConnect router
// const router = createRouter();

// // Apply Multer middleware
// router.use(upload.array('files'));

// router.post(async (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     console.error('No files uploaded');
//     return res.status(400).json({ message: 'No files selected for compression' });
//   }

//   try {
//     console.log('Uploaded files:');
//     for (const file of req.files) {
//       console.log(`  - ${file.originalname} (${file.size} bytes)`);
//     }

//     const compressedImages = await Promise.all(
//       req.files.map(async (file) => {
//         const compressedBuffer = await compressImage(file.buffer);
//         console.log(file.originalname)
//         return {
//           name: file.originalname,
//           data: compressedBuffer.toString('base64'),
//         };
//       })
//     );

//     // Customize response for your frontend (e.g., success message)
//     NextResponse.json({
//       data: compressedImages} , { status:200 }
//     )
//     // res.status(200).json(compressedImages);
//   } catch (error) {
//     console.error('Error processing images:', error);
//     return NextResponse.json(
//       {status:500},
//       {error:"Error"}
//     )
//   }
// });

// async function compressImage(buffer) {
//   const compressedBuffer = await sharp(buffer)
//     .jpeg({ quality: 80 })
//     .toBuffer();
//   return compressedBuffer;
// }

// export const config = {
//   api: {
//     bodyParser: false, // Disable Next.js's body parsing to handle file uploads
//   },
// };

// export default router.handler();




// import multer from 'multer';
// import sharp from 'sharp';
// import { NextResponse } from 'next/server';

// const upload = multer({ dest: 'uploads/' }); // Adjust storage (optional)
  
// export async function POST(req, res) {
//     console.log(req.files)
//   if (!req.files || req.files.length === 0) {
//     console.error('No files uploaded');
//     return NextResponse.json({ message: 'No files selected for compression' }, { status: 400 });
//   }

//   upload.array('files')(req, res, async (err) => {
//     if (err) {
//       console.error('Error uploading files:', err);
//       return NextResponse.json({ message: 'Upload failed' }, { status: 500 });
//     }

//     try {
//       console.log('Uploaded files:');
//       for (const file of req.files) {
//         console.log(`  - ${file.originalname} (${file.size} bytes)`);
//       }

//       const compressedImages = await Promise.all(
//         req.files.map(async (file) => {
//           const compressedBuffer = await compressImage(file.buffer);
//           return {
//             name: file.originalname,
//             data: compressedBuffer.toString('base64'),
//           };
//         })
//       );

//       // Customize response for your frontend (e.g., success message)
//       return NextResponse.json(compressedImages);
//     } catch (error) {
//       console.error('Error processing images:', error);
//       return NextResponse.json({ message: 'Image processing failed' }, { status: 500 });
//     }
//   });
// }

// async function compressImage(buffer) {
//   const compressedBuffer = await sharp(buffer)
//     .jpeg({ quality: 80 })
//     .toBuffer();
//   return compressedBuffer;
// }




// FORMIDABLE

// import { NextResponse } from 'next/server';
// import { IncomingForm } from 'formidable';
// import sharp from 'sharp';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export async function POST(req) {
//     const form = new IncomingForm();
//     const files = [];

//     form.on('file', (field, file) => {
//         files.push(file);
//     });

//     form.on('end', async () => {
//         try {
//             const compressedImages = await Promise.all(files.map(async (file) => {
//                 const compressedBuffer = await compressImage(file);
//                 return {
//                     name: file.originalFilename,
//                     data: compressedBuffer.toString('base64'),
//                 };
//             }));
//             return NextResponse.json(compressedImages)

//         } catch (error) {
//             return NextResponse.json({ error: 'Error compressing the images' }, { status: 500 })
//         }
//     });

//     form.on('error', (err) => {
//         return NextResponse.json({ error: 'Error parsing the form' }, { status: 500 })
//     });

//     form.parse(req);
// };

// async function compressImage(file) {
//     const fileBuffer = await fs.promises.readFile(file.filepath);
//     const compressedBuffer = await sharp(fileBuffer)
//         .jpeg({ quality: 80 })
//         .toBuffer();
//     return compressedBuffer;
// }
