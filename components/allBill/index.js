const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const allBillController = require('./allBillController');

router.get('/all-filter', passPort.authenticate('jwt',{session: false}), allBillController.getAllByIsPay);

router.get('/all-report', passPort.authenticate('jwt',{session: false}), allBillController.getAllByReportStatus)

router.get('/all-resolved', passPort.authenticate('jwt',{session: false}), allBillController.getAllReportResolved);

router.get('/all/:month/:year', passPort.authenticate('jwt',{session: false}), allBillController.getAllBillMonth);

router.get('/:bill_id', passPort.authenticate('jwt',{session: false}), allBillController.getBillById);

router.put('/change-pay', passPort.authenticate('jwt',{session: false}), allBillController.changeIsPay);

router.put('/change-report', passPort.authenticate('jwt',{session: false}), allBillController.changeReportStatus)

// router.delete('/delete/:bill_id', passPort.authenticate('jwt',{session: false}), electricBillController.deleteElectricBill);

module.exports = router;