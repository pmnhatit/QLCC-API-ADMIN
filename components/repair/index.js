const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const repairController = require('./repairController');



router.get('/all/:page/:limit', passPort.authenticate('jwt',{session: false}), repairController.getAllRepairNotices);

router.get('/all/:user_id/:page/:limit', passPort.authenticate('jwt',{session: false}), repairController.getAllRepairNoticesByIdUser);

router.get('/:notice_id', passPort.authenticate('jwt',{session: false}), repairController.getRepairNoticeById);

router.post('/add', passPort.authenticate('jwt',{session: false}), repairController.createRepairNotice);

router.put('/update-status', passPort.authenticate('jwt',{session: false}), repairController.changeStatusRepairNotice);

router.put('/update-is-read', passPort.authenticate('jwt', {session: false}), repairController.changeIsRead);

router.put('/delete', passPort.authenticate('jwt',{session: false}), repairController.deleteRepairNotice);

module.exports = router;