import Tasting from "../models/Tasting.js";

const tastingController = {
  createTasting: async (req, res) => {
    try {
      const tasting = req.body;
      const result = await Tasting.create(tasting);
      res.status(201).json({ message: "Dégustation créée avec succès", tasting: result });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la création de la dégustation", error: error.message });
    }
  },

  getAllTastings: async (req, res) => {
    try {
      const tastings = await Tasting.findAll();
      res.status(200).json(tastings);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des dégustations", error: error.message });
    }
  },

  getTastingById: async (req, res) => {
    try {
      const id = req.params.id;
      const tasting = await Tasting.findById(id); // ⚠️ à coder dans Tasting.js
      if (!tasting) {
        return res.status(404).json({ message: "Dégustation non trouvée" });
      }
      res.status(200).json(tasting);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération de la dégustation", error: error.message });
    }
  },

  getTastingsByUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const tastings = await Tasting.findByUserId(userId);
      res.status(200).json(tastings);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des dégustations", error: error.message });
    }
  },

  getTastingsByWhisky: async (req, res) => {
    try {
      const whiskyId = req.params.whiskyId;
      const tastings = await Tasting.findByWhiskyId(whiskyId);
      res.status(200).json(tastings);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la récupération des dégustations", error: error.message });
    }
  },

  updateTasting: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const success = await Tasting.update(id, data);
      if (!success) {
        return res.status(404).json({ message: "Dégustation non trouvée" });
      }
      res.status(200).json({ message: "Dégustation mise à jour avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la mise à jour de la dégustation", error: error.message });
    }
  },

  deleteTasting: async (req, res) => {
    try {
      const id = req.params.id;
      const success = await Tasting.delete(id);
      if (!success) {
        return res.status(404).json({ message: "Dégustation non trouvée" });
      }
      res.status(200).json({ message: "Dégustation supprimée avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la suppression de la dégustation", error: error.message });
    }
  }
};

export default tastingController;

