// src/config/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false, // obligatoire sur Render
  },
});

// Test connexion
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connecté à PostgreSQL !");
    client.release();
  } catch (err) {
    console.error("❌ Erreur connexion PostgreSQL :", err.message);
  }
})();

export default pool;
