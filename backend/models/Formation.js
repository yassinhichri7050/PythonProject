const mongoose = require('mongoose');

const FormationSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String },
  departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement' }
});

module.exports = mongoose.model('Formation', FormationSchema);
