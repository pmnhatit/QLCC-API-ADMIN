const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var billNotiSchema = new mongoose.Schema({
    title: String,
    content: String,
    create_date: String,
    month: Number,
    year: Number,
    receiver:{
        type: String,
        default: ""
    },
    type:{
        type: Number
    },//0: xac nhan khieu nai | 1:canh bao | 2: cat dien nuoc
    is_confirm:{
        type: Boolean
    },//xac nhan cat dien nuoc
    is_delete:{
        type: Boolean,
        default: false
    }
},
    {
        collection: 'bill_notification'
    });

const billNotification = db.useDb("qlcc").model("bill_notification", billNotiSchema);

module.exports = billNotification;