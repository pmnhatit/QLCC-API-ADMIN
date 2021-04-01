const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var unitPriceSchema = new mongoose.Schema({
    electric: Number,//don gia tien dien
    water: Number,//don gia tien nuoc
    moto_fee: Number,//don gia tien gui xe may
    car_fee: Number//don gia tien gui o to
},
    {
        collection: 'unit_price'
    });

const unitPrice = db.useDb("qlcc").model("unit_price", unitPriceSchema);

module.exports = unitPrice;