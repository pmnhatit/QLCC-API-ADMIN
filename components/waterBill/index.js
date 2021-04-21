const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const waterBillController = require('./waterBillController');

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), waterBillController.getBillByApartmentId);

router.get('/all/:month/:year', passPort.authenticate('jwt',{session: false}), waterBillController.getAllBillsByMonth);

router.get('/month-bill/:apart_id/:month/:year', passPort.authenticate('jwt',{session: false}), waterBillController.getBillByMonth);

router.get('/:bill_id', passPort.authenticate('jwt',{session: false}), waterBillController.getBillById);

router.post('/add', passPort.authenticate('jwt',{session: false}), waterBillController.createElectricBill);

router.post('/import-file', passPort.authenticate('jwt',{session: false}), waterBillController.importCSV);

router.put('/update', passPort.authenticate('jwt',{session: false}), waterBillController.updateWaterBill);

router.delete('/delete/:bill_id', passPort.authenticate('jwt',{session: false}), waterBillController.deleteWaterBill);

module.exports = router;