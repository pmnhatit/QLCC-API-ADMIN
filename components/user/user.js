const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var userSchema = new mongoose.Schema({
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
    license_plates: [{
        type: String,
        default: ""
    }],//bang so xe
    block_id: [{
        type: String,
        default: ""
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
    reset_code: {
        type: String,
        default: ""
    },
    time_reset_code:{
        type: Number,
        default: 0
    },
    is_delete: {
        type: Boolean,
        default: false
    }
},
    {
        collection: 'user'
    });
    userSchema.index({'$**': 'text'});
    
const user = db.useDb("qlcc").model("user", userSchema);
module.exports = user;