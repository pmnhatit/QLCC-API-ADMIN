const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const registerController = require('./registerServiceController');

router.get('/all-register', passPort.authenticate('jwt',{session: false}), registerController.getRegisterService);

router.put('/update-reject', passPort.authenticate('jwt',{session: false}), registerController.updateRejectService);

router.put('/update-confirm', passPort.authenticate('jwt',{session: false}), registerController.updateConfirmRegister);

router.put('/change-is-read', passPort.authenticate('jwt',{session: false}), registerController.changeIsRead);

module.exports = router;