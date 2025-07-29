import db from "../config/db.js";


export const Tasting = {
  create: async (tasting) => {
    const sql = `
      INSERT INTO tastings (user_id, whisky_id, note, comment, date_tasting)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [
      tasting.user_id,
      tasting.whisky_id,
      tasting.note,
      tasting.comment || null,
      tasting.date_tasting || new Date()
    ]);
    return result;
  },

  findByUserId: async (user_id) => {
    const sql = 'SELECT * FROM tastings WHERE user_id = ?';
    const [rows] = await db.execute(sql, [user_id]);
    return rows;
  },

  findByWhiskyId: async (whisky_id) => {
    const sql = 'SELECT * FROM tastings WHERE whisky_id = ?';
    const [rows] = await db.execute(sql, [whisky_id]);
    return rows;
  }
};
