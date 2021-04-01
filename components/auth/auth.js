const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var authSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    password: String,
    name: String,
    phone: String,
    email: String,
    avatar: {
        type: String,
        default: ""
    },
    token_device: {
        type: String,
        default: ""
    },
    role: {
        type: Number,//0: superadmin | 1: admin
        default: 1
    },
    is_delete: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'admin'
    });

const admin = db.useDb("qlcc").model("admin", authSchema);

module.exports = admin;