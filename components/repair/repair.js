const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var repairSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {//id user
        type: String
    },
    apart_id:{
        type: String,
        default: ""
    },
    create_date: {
        type: Number
    },
    image: {
        type: String,
        default: ""
    },
    confirm_image: {
        type: String,
        default: ""
    },
    type: {
        type: Number,
        default: 0//0. Sua chua chung | 1. Tu sua chua | 2. Dich vu sua chua
    },
    is_read_admin: {
        type: Boolean,
        default: false
    },
    is_read_user: {
        type: Boolean,
        default: true
    },
    evaluation:{//danh gia
        is_evaluate: {
            type: Boolean,
            default: false
        },
        comment: {
            type: String,
            default: ""
        },
        image: {
            type: String,
            default: ""
        },
        is_like: {
            type: Boolean,
            default: true
        }
    },
    is_delete:{
        type: Boolean,
        default: false
    },
    status: {
        type: Number,//0: chua xac nhan | 1: da xac nhan | 2: da sua xong | 3. Khong duyet
        default: 0
    }
},
    {
        collection: 'repair_notice'
    });

const repair = db.useDb("qlcc").model("repair_notice", repairSchema);

module.exports = repair;