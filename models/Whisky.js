import db from "../config/db.js";

export const Whisky = {
  create: async (whisky) => {
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
    return result;
  },

  update: async (id, whisky) => {
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
    const [result] = await db.execute(sql, params);
    return result;
  },

  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM whiskys WHERE id = ?', [id]);
    return rows[0];
  },

  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM whiskys');
    return rows;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM whiskys WHERE id = ?', [id]);
    return result;
  }
};

