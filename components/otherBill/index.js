const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const otherBillController = require('./otherBillController');

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), otherBillController.getBillByApartmentId);

router.get('/all/:month/:year', passPort.authenticate('jwt',{session: false}), otherBillController.getAllBillsByMonth);

router.get('/month-bill/:apart_id/:month/:year', passPort.authenticate('jwt',{session: false}), otherBillController.getBillByMonth);

router.get('/:bill_id', passPort.authenticate('jwt',{session: false}), otherBillController.getBillById);

router.post('/add', passPort.authenticate('jwt',{session: false}), otherBillController.createOtherBill);

router.post('/import-file', passPort.authenticate('jwt',{session: false}), otherBillController.importCSV);

router.put('/update', passPort.authenticate('jwt',{session: false}), otherBillController.updateOtherBill);

router.delete('/delete/:bill_id', passPort.authenticate('jwt',{session: false}), otherBillController.deleteOtherBill);

module.exports = router;