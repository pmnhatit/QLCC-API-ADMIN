const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const allBillController = require('./allBillController');

router.get('/all-filter', passPort.authenticate('jwt',{session: false}), allBillController.getAllByIsPay);

router.get('/all/:month/:year', passPort.authenticate('jwt',{session: false}), allBillController.getAllBillMonth);

router.get('/:bill_id', passPort.authenticate('jwt',{session: false}), allBillController.getBillById);

// router.post('/add', passPort.authenticate('jwt',{session: false}), allBillController.createBill);

router.put('/change-pay', passPort.authenticate('jwt',{session: false}), allBillController.changeIsPay);

// router.delete('/delete/:bill_id', passPort.authenticate('jwt',{session: false}), electricBillController.deleteElectricBill);

module.exports = router;