const mongoose = require('mongoose');
var db = mongoose.connection;

//create schame
var registerServiceSchema = new mongoose.Schema({
    content: String,
    user_id: {
        type: String,
        default: ""
    },
    create_date: {
        type: Number
    },
    service_id: {
        type: String
    },
    date:{// day register
        type: Number
    },
    term:{//0: all day | 1: morning | 2: afternoon
        type: Number
    },
    is_read_admin:{
        type: Boolean
    },
    is_read_user:{
        type: Boolean
    },
    status: {
        type: Number//0: chua duyet | 1: da duyet | 2: khong duyet
    },
    reason: {//ly do khong duoc dang ky
        type: String,
        default: ""
    },
    is_delete: {
        type: Boolean,
        default: false
    },
},
    {
        collection: 'register_service'
    });

const registerService = db.useDb("qlcc").model("register_service", registerServiceSchema);

module.exports = registerService;