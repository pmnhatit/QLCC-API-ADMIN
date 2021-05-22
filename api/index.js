const express = require('express');
const router = express.Router();
const auth = require('../components/auth')
const noti = require('../components/notification');
const unitPrice = require('../components/unitPrice');
const elecBill = require('../components/electricBill');
const waterBill = require('../components/waterBill');
const otherBill = require('../components/otherBill');
const apart = require('../components/apartment');
const repair = require('../components/repair');
const uploadImage = require('../components/uploadImage');
const block = require('../components/block');
const pushNoti = require('../components/pushNotification');
const user = require('../components/user');
const uploadV2 = require('../components/uploadV2');
const uploadCSV = require('../components/uploadCSV');
const allBill = require('../components/allBill');
const billNoti = require('../components/billNotification');
const email = require('../components/email');
const notiParking = require('../components/notificationParking');
const service = require('../components/service');
const registerService = require('../components/registerService');

router.use('/auth', auth);

router.use('/noti', noti);

router.use('/unit-price', unitPrice);

router.use('/elec-bill', elecBill);

router.use('/water-bill', waterBill);

router.use('/other-bill', otherBill);

router.use('/apart', apart);

router.use('/repair', repair);

router.use('/upload-image', uploadImage);

router.use('/block', block);

router.use('/push-noti', pushNoti);

router.use('/user', user);

router.use('/uploadv2', uploadV2);

router.use('/upload-csv', uploadCSV);

router.use('/all-bill', allBill);

router.use('/bill-noti', billNoti);

router.use('/email', email);

router.use('/noti-parking', notiParking);

router.use('/service', service);

router.use('/register-service', registerService);

module.exports = router;