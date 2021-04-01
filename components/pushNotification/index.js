const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const pushNotificationController = require('./pushNotificationController')

router.post('/add-notice',passPort.authenticate('jwt',{session: false}), pushNotificationController.createNotice);

// router.post('/changeblock',passPort.authenticate('jwt',{session: false}),userController.changeBlockById)

module.exports = router;