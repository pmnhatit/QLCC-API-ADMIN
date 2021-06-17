const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const electricBillController = require('./electricBillController');

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), electricBillController.getBillByApartmentId);

router.get('/all/:month/:year', passPort.authenticate('jwt',{session: false}), electricBillController.getAllBillsByMonth);

router.get('/month-bill/:apart_id/:month/:year', passPort.authenticate('jwt',{session: false}), electricBillController.getBillByMonth);

router.get('/:bill_id', passPort.authenticate('jwt',{session: false}), electricBillController.getBillById);

// router.post('/add', passPort.authenticate('jwt',{session: false}), electricBillController.createElectricBill);

router.post('/import-file', passPort.authenticate('jwt',{session: false}), electricBillController.importCSV);

router.put('/update', passPort.authenticate('jwt',{session: false}), electricBillController.updateElectricBill);

router.delete('/delete/:bill_id', passPort.authenticate('jwt',{session: false}), electricBillController.deleteElectricBill);

module.exports = router;