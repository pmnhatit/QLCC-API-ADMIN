const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var postSchema = new mongoose.Schema({
    user_id: {
        type: String
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    contact: {
        type: String,
        default: ""
    },
    create_date: {
        type: Number
    },
    images: [{
        type: String,
        default: ""
    }],
    is_read: {
        type: Boolean,
        default: false
    },
    status: {
        type: Number,
        default: 0//0: chua duyet | 1: da duyet | 2: khong duoc duyet
    },
    is_delete: {
        type: Boolean,
        default: false
    },
},
    {
        collection: 'post'
    });

const post = db.useDb("qlcc").model("post", postSchema);

module.exports = post;