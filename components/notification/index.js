const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const notiController = require('./notiController');

router.get('/all/:page/:limit', passPort.authenticate('jwt',{session: false}), notiController.getAllNotification);

router.get('/user/:user_id/:page/:limit',passPort.authenticate('jwt',{session: false}), notiController.getNotificationByUserId);

router.post('/add', passPort.authenticate('jwt',{session: false}), notiController.createNotification);

module.exports = router;