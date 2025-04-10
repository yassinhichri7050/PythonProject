const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');

// Create new formation
router.post('/', formationController.createFormation);

// Get all formations
router.get('/', formationController.getAllFormations);

// Get one formation by ID
router.get('/:id', formationController.getFormationById);

// Update formation
router.put('/:id', formationController.updateFormation);

// Delete formation
router.delete('/:id', formationController.deleteFormation);

module.exports = router;
