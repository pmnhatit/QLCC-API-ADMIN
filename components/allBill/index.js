const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const allBillController = require('./allBillController');

router.get('/all/:month/:year', passPort.authenticate('jwt',{session: false}), allBillController.getAllBillMonth);

router.post('/add', passPort.authenticate('jwt',{session: false}), allBillController.createBill);

// router.put('/update', passPort.authenticate('jwt',{session: false}), electricBillController.updateElectricBill);

// router.delete('/delete/:bill_id', passPort.authenticate('jwt',{session: false}), electricBillController.deleteElectricBill);

module.exports = router;