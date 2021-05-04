const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const notiController = require('./billNotificationController');

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), notiController.getNotiByApartId);

router.get('/stop-services/:status', passPort.authenticate('jwt',{session: false}), notiController.getNotiStopService);

router.get('/:noti_id', passPort.authenticate('jwt',{session: false}), notiController.getNotiById);

router.post('/create-reminder', passPort.authenticate('jwt',{session: false}), notiController.createReminderNotice);

router.post('/create-stop', passPort.authenticate('jwt',{session: false}), notiController.createStopServiceNotice);

router.post('/create-confirm', passPort.authenticate('jwt',{session: false}), notiController.createConfirmNotice);

router.put('/change-confirm', passPort.authenticate('jwt',{session: false}), notiController.changeConfirmStatus);

module.exports = router;