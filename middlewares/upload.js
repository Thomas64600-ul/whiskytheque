import multer from "multer";
import path from "path";
import fs from "fs";

// Création du dossier de destination s’il n’existe pas
const uploadDir = "./public/uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Pour créer les sous-dossiers si besoin
}

// Configuration du stockage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${base}-${unique}${ext}`);
  },
});

// Filtrage des fichiers
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png/;
  const mimeType = file.mimetype.split("/")[1]; // ex: image/png → "png"
  
  if (allowed.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers JPEG, JPG et PNG sont autorisés."), false);
  }
};

// Export du middleware d’upload
export const upload = multer({ storage, fileFilter });
