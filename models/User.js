// models/User.js
import db from "../config/db.js";

const User = {
  create: async (user) => {
    const sql = `
      INSERT INTO users (email, password, role)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
    const values = [
      user.email,
      user.password,
      user.role || "user",
    ];
    const result = await db.query(sql, values);
    return { id: result.rows[0].id, ...user };
  },

  findByEmail: async (email) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0] || null;
  },

  verifyUser: async (email) => {
    await db.query(
      "UPDATE users SET is_verified = true WHERE email = $1",
      [email]
    );
  },

  findById: async (id) => {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
  },
};

export default User;


