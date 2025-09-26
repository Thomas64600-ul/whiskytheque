import pool from "../config/db.js";

const Whisky = {
  create: async (whisky) => {
    try {
      const sql = `
        INSERT INTO whiskys (name, brand, country, category, degree, year, description, image, stock)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
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
      const result = await pool.query(sql, params);
      return result.rows[0]; // 👈 retourne l'objet créé
    } catch (err) {
      throw new Error("Erreur lors de la création du whisky : " + err.message);
    }
  },

  update: async (id, whisky) => {
    try {
      const sql = `
        UPDATE whiskys
        SET name = $1, brand = $2, country = $3, category = $4, degree = $5,
            year = $6, description = $7, image = $8, stock = $9
        WHERE id = $10
        RETURNING *
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
      const result = await pool.query(sql, params);
      return result.rows[0]; // 👈 retourne l'objet mis à jour
    } catch (err) {
      throw new Error("Erreur lors de la mise à jour du whisky : " + err.message);
    }
  },

  findById: async (id) => {
    const result = await pool.query("SELECT * FROM whiskys WHERE id = $1", [id]);
    return result.rows[0] || null;
  },

  findAll: async () => {
    const result = await pool.query("SELECT * FROM whiskys ORDER BY name");
    return result.rows;
  },

  delete: async (id) => {
    const result = await pool.query("DELETE FROM whiskys WHERE id = $1 RETURNING *", [id]);
    return result.rowCount > 0; // 👈 retourne un booléen
  }
};

export default Whisky;

