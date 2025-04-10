const express = require('express');
const router = express.Router();
const departementController = require('../controllers/departementController');

// Create new departement
router.post('/', departementController.createDepartement);

// Get all departements
router.get('/', departementController.getAllDepartements);

// Get one departement by ID
router.get('/:id', departementController.getDepartementById);

// Update departement
router.put('/:id', departementController.updateDepartement);

// Delete departement
router.delete('/:id', departementController.deleteDepartement);

module.exports = router;
