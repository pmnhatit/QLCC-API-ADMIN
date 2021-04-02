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
    identify_card: String,
    native_place: String,
    block_id: [{
        type: String,
        default:""
    }],
    apartment_id: [{
        type: String,
        default: ""
    }],
    avatar: {
        type: String,
        default: ""
    },
    token_device: {
        type: String,
        default: ""
    },
    is_delete: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'user'
    });

const user = db.useDb("qlcc").model("user", authSchema);

module.exports = user;