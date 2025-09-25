import db from "../config/db.js";

const Tasting = {
  create: async (tasting) => {
    try {
      const sql = `
        INSERT INTO tastings (user_id, whisky_id, note, comment, date_tasting)
        VALUES (?, ?, ?, ?, ?)
      `;
      const [result] = await db.execute(sql, [
        tasting.user_id,
        tasting.whisky_id,
        tasting.note,
        tasting.comment || null,
        tasting.date_tasting || new Date(),
      ]);
      return { id: result.insertId, ...tasting };
    } catch (err) {
      throw new Error("Erreur lors de la création de la dégustation : " + err.message);
    }
  },

  findAll: async () => {
    const [rows] = await db.execute("SELECT * FROM tastings ORDER BY date_tasting DESC");
    return rows;
  },

  findByUserId: async (user_id) => {
    const [rows] = await db.execute("SELECT * FROM tastings WHERE user_id = ?", [user_id]);
    return rows;
  },

  findByWhiskyId: async (whisky_id) => {
    const [rows] = await db.execute("SELECT * FROM tastings WHERE whisky_id = ?", [whisky_id]);
    return rows;
  },

  update: async (id, tasting) => {
    const sql = `
      UPDATE tastings
      SET note = ?, comment = ?, date_tasting = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(sql, [
      tasting.note,
      tasting.comment || null,
      tasting.date_tasting || new Date(),
      id,
    ]);
    return result.affectedRows > 0; // 👈 plus clair
  },

  delete: async (id) => {
    const [result] = await db.execute("DELETE FROM tastings WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};

export default Tasting;

