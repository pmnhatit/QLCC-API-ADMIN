const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var allBillSchema = new mongoose.Schema({
    apart_id: {
        type: String,
        required: true
    },
    electric_bill: {
        type: Number,
        default: 0
    },
    water_bill: {
        type: Number,
        default: 0
    },
    other_bill: {
        type: Number,
        default: 0
    },
    image:[{
        type: String,
        default: ""
    }],
    month: Number,
    year: Number,
    total_money: Number,
    is_pay: {
        type: Boolean,
        default: false
    },
    is_delete:{
        type: Boolean,
        default: false
    }
},
    {
        collection: 'all_bill'
    });

const allBill = db.useDb("qlcc").model("all_bill", allBillSchema);

module.exports = allBill;