const mongoose = require('mongoose');

const DepartementSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  description: { type: String }
});

module.exports = mongoose.model('Departement', DepartementSchema);
