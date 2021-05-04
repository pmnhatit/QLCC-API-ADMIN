const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const emailController = require('./emailController');

router.post('/create-stop-services', passPort.authenticate('jwt',{session: false}), emailController.createEmailStopServices);

module.exports = router;