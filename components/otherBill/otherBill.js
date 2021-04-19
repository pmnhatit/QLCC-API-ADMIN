const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var otherBillSchema = new mongoose.Schema({
    apart_id: String,//ma can ho
    apart_management: Number,//phi quan ly chung cu
    parking_fees: Number,//phi giu xe
    maintenance_fee: Number,//phi bao tri
    service_charge: Number,//phi dich vu
    other_fees: {
        type: Number,
        default: 0
    },//phi khac
    total_money: {
        type: Number,
        default: 0
    },
    month: Number,
    year: Number,
    note: String,//ghi chu
    is_pay:{
        type: Boolean,
        default: false
    },
    is_delete:{
        type: Boolean,
        default: false
    }
},
    {
        collection: 'other_bill'
    });

const otherBill = db.useDb("qlcc").model("other_bill", otherBillSchema);

module.exports = otherBill;