import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";


// Middlewares personnalisés
import { verifyToken } from "./middleware/auth.js";
import { upload } from "./middleware/upload.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import whiskyRoutes from "./routes/whiskyRoutes.js";
import tastingRoutes from "./routes/tastingRoutes.js";


dotenv.config();
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


app.use("/public", express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use("/api/auth", authRoutes);
app.use("/api/whiskys", whiskyRoutes);
app.use("/api/tastings", tastingRoutes);


app.get("/", (req, res) => {
  res.send("Bienvenue sur la Whiskythèque 🍷");
});


app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
);
