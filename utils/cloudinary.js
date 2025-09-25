import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(filePath, folder = "uploads") {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });
    return result.secure_url; // retourne directement l’URL de l’image
  } catch (error) {
    console.error("Erreur upload Cloudinary:", error);
    throw new Error("Erreur lors de l’upload de l’image");
  }
}

export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Erreur suppression Cloudinary:", error);
    throw new Error("Erreur lors de la suppression de l’image");
  }
}

export default cloudinary;

