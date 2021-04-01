const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const unitPriceController = require('./unitPriceController');

router.get('/', passPort.authenticate('jwt',{session: false}), unitPriceController.getUnitPrice);

router.post('/add', passPort.authenticate('jwt',{session: false}), unitPriceController.createUnitPrice);

router.put('/edit', passPort.authenticate('jwt',{session: false}), unitPriceController.editUnitPrice);

module.exports = router;