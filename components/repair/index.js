const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const repairController = require('./repairController');

router.get('/all/:page/:limit', passPort.authenticate('jwt',{session: false}), repairController.getAllRepairNotices);

router.get('/all/:user_id/:page/:limit', passPort.authenticate('jwt',{session: false}), repairController.getAllRepairNoticesByIdUser);

router.get('/notices', passPort.authenticate('jwt',{session: false}), repairController.getRepairNotices);

router.get('/count-notices', passPort.authenticate('jwt',{session: false}), repairController.countRepairNotices);

router.get('/:notice_id', passPort.authenticate('jwt',{session: false}), repairController.getRepairNoticeById);

router.put('/update-status', passPort.authenticate('jwt',{session: false}), repairController.changeStatusRepairNotice);

router.put('/update-confirm-image', passPort.authenticate('jwt',{session: false}), repairController.updateConfirmImage);

router.put('/admin/update-is-read', passPort.authenticate('jwt', {session: false}), repairController.changeIsRead);

router.delete('/delete/:notice_id', passPort.authenticate('jwt',{session: false}), repairController.deleteRepairNotice);//co kha nang ko dung

module.exports = router;