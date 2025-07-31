import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import db from './config/db.js'; // OK — db est le pool
import authRoutes from './routes/authRoutes.js';
import deleteUserCron from "./middlewares/deleteUser.js";
import auditDependencies from './middlewares/auditDependencies.js'
import { limiter } from './middlewares/rateLimiter.js';
import whiskyRoutes from './routes/whiskyRoutes.js';
import tastingRoutes from './routes/tastingRoutes.js';
dotenv.config();

const app = express();


app.use(express.json());
app.use(cookieParser());

// Démarre le cron
deleteUserCron.start();
auditDependencies.start()
app.use(limiter)
app.use('/api/auth', authRoutes);
app.use("/api/whiskys", whiskyRoutes);
app.use("/api/tastings", tastingRoutes);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
