import db from "../config/db.js";

const Tasting = {
  create: async (tasting) => {
    try {
      const sql = `
        INSERT INTO tastings (user_id, whisky_id, note, comment, date_tasting)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `;
      const values = [
        tasting.user_id,
        tasting.whisky_id,
        tasting.note,
        tasting.comment || null,
        tasting.date_tasting || new Date(),
      ];
      const { rows } = await db.query(sql, values);
      return { id: rows[0].id, ...tasting };
    } catch (err) {
      throw new Error("Erreur lors de la création de la dégustation : " + err.message);
    }
  },

  findAll: async () => {
    const sql = "SELECT * FROM tastings ORDER BY date_tasting DESC";
    const { rows } = await db.query(sql);
    return rows;
  },

  findByUserId: async (user_id) => {
    const sql = "SELECT * FROM tastings WHERE user_id = $1";
    const { rows } = await db.query(sql, [user_id]);
    return rows;
  },

  findByWhiskyId: async (whisky_id) => {
    const sql = "SELECT * FROM tastings WHERE whisky_id = $1";
    const { rows } = await db.query(sql, [whisky_id]);
    return rows;
  },

  update: async (id, tasting) => {
    const sql = `
      UPDATE tastings
      SET note = $1, comment = $2, date_tasting = $3
      WHERE id = $4
      RETURNING id
    `;
    const values = [
      tasting.note,
      tasting.comment || null,
      tasting.date_tasting || new Date(),
      id,
    ];
    const { rowCount } = await db.query(sql, values);
    return rowCount > 0;
  },

  delete: async (id) => {
    const sql = "DELETE FROM tastings WHERE id = $1";
    const { rowCount } = await db.query(sql, [id]);
    return rowCount > 0;
  },
};

export default Tasting;

