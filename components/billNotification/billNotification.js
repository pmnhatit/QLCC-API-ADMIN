const mongoose = require('mongoose');
var db = mongoose.connection;


//create schame
var billNotiSchema = new mongoose.Schema({
    title: String,
    content: String,
    create_date: String,
    receiver:{
        type: String,
        default: ""
    },
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