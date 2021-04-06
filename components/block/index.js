const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const blockController = require('./blockController');

router.get('/all', passPort.authenticate('jwt', {session: false}), blockController.getAllBlocks);

router.get('/:block_id', passPort.authenticate('jwt', {session: false}), blockController.getBlockById);

router.post('/add', passPort.authenticate('jwt', {session: false}), blockController.createBlock);

router.put('/update', passPort.authenticate('jwt', {session: false}), blockController.updateBlockById);

module.exports = router;