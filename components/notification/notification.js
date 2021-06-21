const mongoose = require('mongoose');
var db = mongoose.connection;


//create schame
var notiSchema = new mongoose.Schema({
    title: String,
    content: String,
    create_date: {
        type: Number
    },
    image: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    // type: {
    //     type: String//"all": all | block_id | "1,2,3...": floor | user_id
    // },
    receivers: [
        {
            apart_id: {
                type: String
            },
            is_read: {
                type: Boolean,
                default: false
            }
    }],
    is_delete:{
        type: Boolean,
        default: false
    }
},
    {
        collection: 'notification'
    });

const notification = db.useDb("qlcc").model("notification", notiSchema);

module.exports = notification;