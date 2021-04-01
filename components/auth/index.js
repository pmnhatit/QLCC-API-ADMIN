const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const authController = require('./authController')
const author = require('../../middleware/authorization');

router.get('/all', passPort.authenticate('jwt',{session: false}), authController.getAllUser);

router.post('/login',passPort.authenticate('local',{session: false}), authController.login);

router.post('/add', passPort.authenticate('jwt',{session: false}), author, authController.createUser);

router.put('/update-info', passPort.authenticate('jwt',{session: false}), authController.updateInfo);

router.put('/update-avatar', authController.updateAvatar);

router.put('/update-token-device', passPort.authenticate('jwt',{session: false}), authController.updateTokenDevice);

router.put('/change-pass', passPort.authenticate('jwt',{session: false}), authController.changePassword);

router.delete('/delete/:user_id', passPort.authenticate('jwt',{session: false}), author, authController.deleteUser);

module.exports = router;