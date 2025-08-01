import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./public/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); // Normaliser l'extension
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-'); // Remplacer espaces pour éviter soucis
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${unique}${ext}`);
  },
});

// Filtrage des fichiers, en vérifiant aussi le mimetype complet
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];
  
  if (allowedMimeTypes.includes(file.mimetype.toLowerCase())) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers JPEG, JPG et PNG sont autorisés."), false);
  }
};

export const upload = multer({ storage, fileFilter });
