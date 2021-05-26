const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const postController = require('./postController');

router.get('/all-post', passPort.authenticate('jwt',{session: false}), postController.getPost);

router.put('/confirm-post', passPort.authenticate('jwt',{session: false}), postController.confirmPost);

router.put('/reject-post', passPort.authenticate('jwt',{session: false}), postController.rejectPost);

router.put('/change-is-read', passPort.authenticate('jwt',{session: false}), postController.changeIsRead);

router.delete('/delete', passPort.authenticate('jwt',{session: false}), postController.deletePost);

module.exports = router;