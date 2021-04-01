const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var waterBillSchema = new mongoose.Schema({
    apart_id: String,
    old_index: Number,
    new_index: Number,
    unit_price: Number,
    consume: Number,
    month: Number,
    year: Number,
    total_money: Number,
    is_delete: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'water_bill'
    });

const waterBill = db.useDb("qlcc").model("water_bill", waterBillSchema);

module.exports = waterBill;