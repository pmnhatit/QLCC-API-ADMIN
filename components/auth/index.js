const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const authController = require('./authController')
const author = require('../../middleware/authorization');

router.get('/users-block/:block_id', passPort.authenticate('jwt',{session: false}), authController.getAllUserByBlockId);

router.get('/all', passPort.authenticate('jwt',{session: false}), author, authController.getAllUser);

router.post('/login',passPort.authenticate('local',{session: false}), authController.login);

// router.post('/add', authController.createUser);

router.post('/add', passPort.authenticate('jwt',{session: false}), author, authController.createUser);

router.put('/update-info', passPort.authenticate('jwt',{session: false}), authController.updateInfo);

router.put('/update-avatar', authController.updateAvatar);

router.put('/update-token-device', passPort.authenticate('jwt',{session: false}), authController.updateTokenDevice);

//router.put('/update-block', passPort.authenticate('jwt',{session: false}), authController.updateBlockId); //xem xet co dung khong

// router.post('/changeblock',passPort.authenticate('jwt',{session: false}),userController.changeBlockById)

module.exports = router;