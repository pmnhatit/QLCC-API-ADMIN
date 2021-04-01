const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var repairSchema = new mongoose.Schema({//phai sua lai
    title: String,
    content: String,
    //appointment_date: String,
    //apart_id: String,//ma chung cu
    author: String,
    create_date: {
        type: String
    },
    //receiver: Number,//1: admin, 2: user
    image: {
        type: String,
        default: ""
    },
    is_read_admin: {
        type: Boolean,
        default: false
    },
    is_read_user: {
        type: Boolean,
        default: true
    },
    is_delete:{
        type: Boolean,
        default: false
    },
    status: {
        type: Number,//0: chua xac nhan | 1: da xac nhan | 2: da sua xong
        default: 0
    }
},
    {
        collection: 'repair_notice'
    });

const repair = db.useDb("qlcc").model("repair_notice", repairSchema);

module.exports = repair;