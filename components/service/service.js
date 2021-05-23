const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var serviceSchema = new mongoose.Schema({
    name: String,
    block_id: String,
    images: [{
        type: String,
        default: ""
    }],
    registed: [{
        date: {
            type: Number,
            default: 0
        },
        term: {
            type: Number,
            default: 0// 0: all day | 1: moring | 2: afternoon
        },
        user_id:{
            type: String,
            default: ""
        }
    }],
    description: {
        type: String, 
        default:""
    },
    is_delete: {
        type: Boolean,
        default: false
    },
},
    {
        collection: 'service'
    });

const service = db.useDb("qlcc").model("service", serviceSchema);

module.exports = service;