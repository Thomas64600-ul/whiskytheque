import db from "../config/db.js";

const User = {
  create: async (user) => {
    const sql = `
      INSERT INTO users (email, password, role, image, contact)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [
      user.email,
      user.password,
      user.role || "user",
      user.image || null,
      user.contact || null,
    ]);
    return result;
  },

  findByEmail: async (email) => {
    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  },

  verifyUser: async (email) => {
    const now = new Date();
    await db.execute(
      "UPDATE users SET created_at = ? WHERE email = ?",
      [now, email]
    );
  },

  findById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  },
};

export default User;
