const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var ruleSchema = new mongoose.Schema({
    payment_deadline: {//thoi han thanh toan
        type: Number
    }
},
    {
        collection: 'rule'
    });

const rule = db.useDb("qlcc").model("rule", ruleSchema);

module.exports = rule;