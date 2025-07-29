import { Whisky } from "../models/Whisky.js";

export const whiskyController = {
  createWhisky: async (req, res) => {
    try {
      const whiskyData = {
  name: req.body.nom,
  brand: req.body.marque,
  country: req.body.pays,
  category: req.body.categorie,
  degree: req.body.degre,
  year: req.body.annee ?? null,
  description: req.body.description ?? null,
  image: req.body.image ?? null,
  stock: req.body.stock ?? 0
};


      const result = await Whisky.create(whiskyData);
      res.status(201).json({ message: "Whisky créé avec succès", id: result.insertId });

    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création du whisky", error: error.message });
    }
  },

  updateWhisky: async (req, res) => {
    try {
      const id = req.params.id;
      const whisky = req.body;
      const result = await Whisky.update(id, whisky);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Whisky non trouvé" });
      }
      res.status(200).json({ message: "Whisky mis à jour avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour du whisky", error: error.message });
    }
  },

  getWhiskyById: async (req, res) => {
    try {
      const id = req.params.id;
      const row = await Whisky.findById(id);
      if (!row) {
        return res.status(404).json({ message: "Whisky non trouvé" });
      }
      res.status(200).json(row);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération du whisky", error: error.message });
    }
  },

  getAllWhiskys: async (req, res) => {
    try {
      const whiskys = await Whisky.findAll();
      res.status(200).json(whiskys);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des whiskys", error: error.message });
    }
  },

  deleteWhisky: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Whisky.delete(id);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Whisky non trouvé" });
      }
      res.status(200).json({ message: "Whisky supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression du whisky", error: error.message });
    }
  }
};
