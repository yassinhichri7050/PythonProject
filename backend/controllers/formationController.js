const Formation = require('../models/Formation');

exports.createFormation = async (req, res) => {
  try {
    const formation = new Formation(req.body);
    await formation.save();
    res.status(201).json(formation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllFormations = async (req, res) => {
  try {
    const formations = await Formation.find().populate('departement');
    res.json(formations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id).populate('departement');
    if (!formation) return res.status(404).json({ message: 'Formation non trouvée' });
    res.json(formation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFormation = async (req, res) => {
  try {
    const updated = await Formation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFormation = async (req, res) => {
  try {
    await Formation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Formation supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
