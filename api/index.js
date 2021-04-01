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

module.exports = router;