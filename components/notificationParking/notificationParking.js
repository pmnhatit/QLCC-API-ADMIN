const mongoose = require('mongoose');
var db = mongoose.connection;


//create schame
var notiParkingSchema = new mongoose.Schema({
    title: String,
    content: String,
    create_date: String,
    image: {
        type: String,
        default: ""
    },
    type: {
        type: Number//0: report | 1: response
    },
    author: {
        type: String// neu user tao se la user_id, admin se la admin0
    },
    receiver: {
        type: String// neu nguoi nhan la user thi user_id, con admin thi admin0
    },
    is_confirm: {
        type: Boolean,
        default: false
    },
    is_read_admin: {
        type: Boolean,
        default: false
    },
    is_read_user: {
        type: Boolean,
        default: false
    },
    is_delete:{
        type: Boolean,
        default: false
    }
},
    {
        collection: 'notification_parking'
    });

const notification = db.useDb("qlcc").model("notification", notiParkingSchema);

module.exports = notification;