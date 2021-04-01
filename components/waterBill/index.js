const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const waterBillController = require('./waterBillController');

router.get('/all/:apart_id', passPort.authenticate('jwt',{session: false}), waterBillController.getBillByApartmentId);

router.get('/month-bill/:apart_id/:month/:year', passPort.authenticate('jwt',{session: false}), waterBillController.getBillByMonth);

router.post('/add', passPort.authenticate('jwt',{session: false}), waterBillController.createElectricBill);

router.put('/update', passPort.authenticate('jwt',{session: false}), waterBillController.updateWaterBill);

router.delete('/delete', passPort.authenticate('jwt',{session: false}), waterBillController.deleteWaterBill);

module.exports = router;