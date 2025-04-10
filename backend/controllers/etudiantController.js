const Etudiant = require('../models/Etudiant');


exports.registerEtudiant = async (req, res) => {
  try {
    
    const { 
      nom, 
      email, 
      motdepasse, 
      mdp = motdepasse, 
      departement,
      formationsInscrites, 
      formations = formationsInscrites 
    } = req.body;

    
    if (!nom || !email || !mdp || !departement) {
      return res.status(400).json({ message: "Champs requis manquants" });
    }

    
    const existingEtudiant = await Etudiant.findOne({ email });
    if (existingEtudiant) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    
    const newEtudiant = new Etudiant({
      nom,
      email,
      mdp, 
      departement,
      formations: Array.isArray(formations) ? formations : [formations] 
    });

    await newEtudiant.save();
    res.status(201).json(newEtudiant);
    
  } catch (err) {
    console.error("Erreur d'inscription:", err);
    res.status(500).json({ 
      message: "Erreur serveur",
      error: process.env.NODE_ENV === 'development' ? err : {}
    });
  }
};


exports.getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find().populate('departement').populate('formationsInscrites');
    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEtudiantById = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id)
      .populate('departement')
      .populate('formations');
    
    if (!etudiant) return res.status(404).json({ message: 'Etudiant non trouvé' });
    
    res.json(etudiant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEtudiant = async (req, res) => {
  try {
    const updated = await Etudiant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.deleteEtudiant = async (req, res) => {
  try {
    await Etudiant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Etudiant supprimé' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.loginEtudiant = async (req, res) => {
  try {
    const { email, motdepasse } = req.body;

    
    const etudiant = await Etudiant.findOne({ email })
      .populate('departement')
      .populate('formations');

    if (!etudiant) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    if (etudiant.mdp !== motdepasse) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    res.json({
      success: true,
      etudiant: {
        _id: etudiant._id,
        nom: etudiant.nom,
        email: etudiant.email,
        departement: etudiant.departement, 
        formations: etudiant.formations     
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};