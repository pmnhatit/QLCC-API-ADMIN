const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const uploadCSVController = require('./uploadCSVController');

router.get('/signed-url', passPort.authenticate('jwt',{session: false}), uploadCSVController.getSignedUrl);

module.exports = router;