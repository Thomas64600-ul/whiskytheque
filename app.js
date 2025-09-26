import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes.js";
import whiskyRoutes from "./routes/whiskyRoutes.js";
import tastingRoutes from "./routes/tastingRoutes.js";

import deleteUserCron from "./middlewares/deleteUser.js";
import auditDependencies from "./middlewares/auditDependencies.js";
import { limiter } from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();

// =============================
// Middlewares globaux
// =============================
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); 
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*", // accepte ton front
    credentials: true,
  })
);

// =============================
// Cron jobs
// =============================
deleteUserCron;
auditDependencies;

// =============================
// Limiter (à appliquer AVANT les routes auth)
// =============================
app.use("/api/auth/login", limiter);
app.use("/api/auth/register", limiter);

// =============================
// Routes
// =============================
app.use("/api/auth", authRoutes);
app.use("/api/whiskys", whiskyRoutes);
app.use("/api/tastings", tastingRoutes);

// =============================
// Démarrage serveur
// =============================
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// =============================
// Gestion des erreurs globales
// =============================
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
