const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var electricBillSchema = new mongoose.Schema({
    apart_id: String,
    old_index: Number,
    new_index: Number,
    unit_price: Number,
    consume: Number,
    month: Number,
    year: Number,
    total_money: Number,
    is_delete:{
        type: Boolean,
        default: false
    }
},
    {
        collection: 'electric_bill'
    });

const electricBill = db.useDb("qlcc").model("electric_bill", electricBillSchema);

module.exports = electricBill;