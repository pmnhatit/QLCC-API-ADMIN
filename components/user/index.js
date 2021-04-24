const express = require('express');
const router = express.Router();

const passPort = require('../../services/passport');
const userController = require('./userController');

router.get('/all', passPort.authenticate('jwt',{session: false}), userController.getAllUser);

router.get('/search', passPort.authenticate('jwt',{session: false}), userController.searchByLicensePlate);

router.get('/:user_id', passPort.authenticate('jwt',{session: false}), userController.getUserById);

router.post('/add', passPort.authenticate('jwt',{session: false}), userController.createUser);

router.put('/update', passPort.authenticate('jwt',{session: false}), userController.updateApartOfUser);

router.put('/update-license-plate', passPort.authenticate('jwt',{session: false}), userController.updateLicensePlates);

router.delete('/delete/:user_id', passPort.authenticate('jwt',{session: false}), userController.deleteUser);

module.exports = router;