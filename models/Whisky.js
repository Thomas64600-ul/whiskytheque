import db from "../config/db.js";

const Whisky = {
  create: async (whisky) => {
    try {
      const sql = `
        INSERT INTO whiskys (name, brand, country, category, degree, year, description, image, stock)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const params = [
        whisky.name,
        whisky.brand,
        whisky.country ?? null,
        whisky.category,
        whisky.degree,
        whisky.year ?? null,
        whisky.description ?? null,
        whisky.image ?? null,
        whisky.stock ?? 0
      ];
      const [result] = await db.execute(sql, params);
      return { id: result.insertId, ...whisky };
    } catch (err) {
      throw new Error("Erreur lors de la création du whisky : " + err.message);
    }
  },

  update: async (id, whisky) => {
    try {
      const sql = `
        UPDATE whiskys
        SET name = ?, brand = ?, country = ?, category = ?, degree = ?, year = ?, description = ?, image = ?, stock = ?
        WHERE id = ?
      `;
      const params = [
        whisky.name,
        whisky.brand,
        whisky.country ?? null,
        whisky.category,
        whisky.degree,
        whisky.year ?? null,
        whisky.description ?? null,
        whisky.image ?? null,
        whisky.stock ?? 0,
        id
      ];
      await db.execute(sql, params);
      return { id, ...whisky }; // 👈 plus cohérent
    } catch (err) {
      throw new Error("Erreur lors de la mise à jour du whisky : " + err.message);
    }
  },

  findById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM whiskys WHERE id = ?", [id]);
    return rows[0] || null;
  },

  findAll: async () => {
    const [rows] = await db.execute("SELECT * FROM whiskys ORDER BY name");
    return rows;
  },

  delete: async (id) => {
    const [result] = await db.execute("DELETE FROM whiskys WHERE id = ?", [id]);
    return result.affectedRows > 0; // 👈 retourne un booléen
  }
};

export default Whisky;

