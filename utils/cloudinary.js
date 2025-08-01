import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,      // clé API ici
  api_secret: process.env.CLOUDINARY_API_SECRET, // secret API ici
});

export default cloudinary;
