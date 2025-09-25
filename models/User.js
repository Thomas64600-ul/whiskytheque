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
    return { id: result.insertId, ...user };
  },

  findByEmail: async (email) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0] || null;
  },

  verifyUser: async (email) => {
    await db.execute(
      "UPDATE users SET is_verified = ? WHERE email = ?",
      [true, email]
    );
  },

  findById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0] || null;
  },
};

export default User;

