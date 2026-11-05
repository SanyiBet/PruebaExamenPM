const express = require('express');
const router = express.Router();
const { obtenerAsientos, bloquearAsiento } = require('../controllers/busController');

router.get('/asientos', obtenerAsientos);
router.post('/asientos/bloquear', bloquearAsiento);

module.exports = router;