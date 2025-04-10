const Departement = require('../models/Departement');

exports.createDepartement = async (req, res) => {
  try {
    const departement = new Departement(req.body);
    await departement.save();
    res.status(201).json(departement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllDepartements = async (req, res) => {
  try {
    const departements = await Departement.find();
    res.json(departements);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDepartementById = async (req, res) => {
  try {
    const departement = await Departement.findById(req.params.id);
    if (!departement) return res.status(404).json({ message: 'Departement non trouvé' });
    res.json(departement);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDepartement = async (req, res) => {
  try {
    const updated = await Departement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteDepartement = async (req, res) => {
  try {
    await Departement.findByIdAndDelete(req.params.id);
    res.json({ message: 'Departement supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
