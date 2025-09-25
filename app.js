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

// Middlewares globaux
app.use(express.json());
app.use(cookieParser());
app.use(helmet()); // sécurise les headers HTTP
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // autorise ton front

// ⚡ Cron jobs (juste importer suffit, pas besoin de .start())
deleteUserCron;
auditDependencies;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/whiskys", whiskyRoutes);
app.use("/api/tastings", tastingRoutes);

// Exemple : limiter uniquement login et register
app.use("/api/auth/login", limiter);
app.use("/api/auth/register", limiter);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

// Gestion des promesses non catchées
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(() => process.exit(1));
});
