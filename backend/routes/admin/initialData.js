const express = require('express');

const initialDataController = require('../../controllers/admin/initialData');
const router = express.Router();

// ! Admin initial data => /api/v1/initialdata [POST]
router.post('/initialdata', initialDataController.initialData);

module.exports = router;
