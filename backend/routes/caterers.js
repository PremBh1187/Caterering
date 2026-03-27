const express = require('express');
const router = express.Router();
const { getAllCaterers, getCatererById, createCaterer } = require('../controllers/catererController');
const { validateCaterer } = require('../middleware/validation');

router.get('/', getAllCaterers);
router.get('/:id', getCatererById);
router.post('/', validateCaterer, createCaterer);

module.exports = router;