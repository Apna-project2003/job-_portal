// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config();
//  cloudinary.config({ 
//         cloud_name: process.env.CLOUD_NAME, 
//         api_key: process.env.CLOUD_API_KEY, 
//         api_secret: process.env.API_SECRET, 
//  })
//  export default cloudinary;



import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

export default cloudinary;
