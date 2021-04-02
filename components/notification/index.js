const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const notiController = require('./notiController');

router.get('/all/:page/:limit', passPort.authenticate('jwt',{session: false}), notiController.getAllNotification);

router.post('/add', passPort.authenticate('jwt',{session: false}), notiController.createNotification);

router.put('/update', passPort.authenticate('jwt',{session: false}), notiController.updateNotification);

router.delete('/delete/:noti_id', passPort.authenticate('jwt',{session: false}), notiController.deleteNotification);

module.exports = router;