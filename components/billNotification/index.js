const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const notiController = require('./billNotificationController');

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), notiController.getNotiByApartId);

router.get('/:noti_id', passPort.authenticate('jwt',{session: false}), notiController.getNotiById);

router.post('/add', passPort.authenticate('jwt',{session: false}), notiController.createBillNotification);

module.exports = router;