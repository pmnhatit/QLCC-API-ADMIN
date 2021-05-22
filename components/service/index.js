const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const serviceController = require('./service.Controller');

router.get('/all-services', passPort.authenticate('jwt',{session: false}), serviceController.getServices);

router.post('/create', passPort.authenticate('jwt',{session: false}), serviceController.createService);

router.put('/update-registed', passPort.authenticate('jwt',{session: false}), serviceController.updateRegisted);

router.put('/update', passPort.authenticate('jwt',{session: false}), serviceController.updateService);

module.exports = router;