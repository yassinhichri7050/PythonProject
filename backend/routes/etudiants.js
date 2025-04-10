const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');

// Register new student
router.post('/register', etudiantController.registerEtudiant);

// login 
router.post('/login', etudiantController.loginEtudiant);  

// Get all students
router.get('/', etudiantController.getAllEtudiants);

// Get one student by ID
router.get('/:id', etudiantController.getEtudiantById);

// Update student
router.put('/:id', etudiantController.updateEtudiant);

// Delete student
router.delete('/:id', etudiantController.deleteEtudiant);

module.exports = router;
