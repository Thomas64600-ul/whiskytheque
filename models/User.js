import db from "../config/db.js";

const User = {
  create: async (user) => {
    const sql = `
      INSERT INTO users (email, password, role, image, contact)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
    const values = [
      user.email,
      user.password,
      user.role || "user",
      user.image || null,
      user.contact || null,
    ];

    const { rows } = await db.query(sql, values);
    return { id: rows[0].id, ...user };
  },

  findByEmail: async (email) => {
    const sql = "SELECT * FROM users WHERE email = $1";
    const { rows } = await db.query(sql, [email]);
    return rows[0] || null;
  },

  verifyUser: async (email) => {
    const sql = "UPDATE users SET is_verified = $1 WHERE email = $2";
    await db.query(sql, [true, email]);
  },

  findById: async (id) => {
    const sql = "SELECT * FROM users WHERE id = $1";
    const { rows } = await db.query(sql, [id]);
    return rows[0] || null;
  },
};

export default User;

