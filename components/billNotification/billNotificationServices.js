const mongoose = require('mongoose');

const billNotiModel = require('./billNotification');
//GET
module.exports.getNotiById = async (noti_id) =>{
    const result = await billNotiModel.findOne({'_id': noti_id, 'is_delete': false});
    return result;
}
module.exports.getNotiByApartId = async (apart_id, page, limit) =>{
    const sk = (page-1)*limit;
    const l = parseInt(limit);
    const result = await billNotiModel.find({'receiver': apart_id, 'is_delete': false},
        null,{
            skip: sk,
            limit: l
        }).sort({$natural: -1});
    return result;
}
module.exports.getNotiStopService = async (confirm_status) =>{//lay danh sach thong bao cat dien nuoc
    const result = await billNotiModel.find({'type': 2, 'is_confirm': confirm_status, 'is_delete': false});
    return result;
}
//CREATE
module.exports.createReminderNotice = async (apart_id, apart_name, month, year, total_money) =>{
    const content = `Theo quy định về thời gian thanh toán tiền điện nước của chung cư trong khoảng thời gian từ ngày 01 đến ngày 05 hàng tháng. Tuy nhiên đến nay đã là mùng 06, quá hạn thanh toán mà căn hộ ${apart_name} vẫn chưa thanh toán. Vậy BQL chung cư yêu cầu chủ căn hộ ${apart_name} thanh toán đầy đủ số tiền điện nước ${month}/${year} là ${total_money} theo quy định. Nếu sau 05 ngày chủ căn hộ chưa thanh toán thi BQL sẽ tiến hành xử lý theo quy định của chung cư.`;
    const title = "Nhắc nhở thanh toán điện nước";
    const type = 1;
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000*7));
    const create_date = nd.valueOf();
    const newNoti = new billNotiModel({title, content, create_date, receiver: apart_id, type, month, year});
    return await newNoti.save();
}
module.exports.createStopServiceNotice = async (apart_id, apart_name, month, year) =>{
    
    let m = month, y = year;
    if(month==12){
        m = 1, y = y + 1;
    }else{
        m = m + 1;
    }
    const content = `BQL chung cư xin thông báo ngừng cung cấp điện nước của căn hộ ${apart_name} từ ngày 10/${m}/${y} vì lý do chưa thanh toán các khoản chi phí cần thiết theo quy định. Đề nghị anh/chị liên hệ BQL để giải quyết.`;
    const title = "Ngừng cung cấp điện nước";
    const type = 2;
    const is_confirm = false;
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000*7));
    const create_date = nd.valueOf();
    const newNoti = new billNotiModel({title, content, create_date, receiver: apart_id, type, month, year, is_confirm});
    return await newNoti.save();
}
module.exports.createConfirmNotice = async (apart_id, title, content) =>{
    // const title = "Xác nhận khiếu nại";
    // const content = `BQL chung cư xác nhận căn hộ ${apart_name} đã thanh toán đầy đủ các chi phí cần thiết.`;
    const type = 0;
    const d = new Date();
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    const nd = new Date(utc + (3600000*7));
    const create_date = nd.valueOf();
    const newNoti = new billNotiModel({title, content, create_date, receiver: apart_id, type});
    return await newNoti.save();
}
//UPDATE
module.exports.changeConfirmStatus = async (notice_id) =>{
    mongoose.set('useFindAndModify', false);
    const result = await billNotiModel.findOneAndUpdate({'_id': notice_id},
    {'is_confirm': true},
    {new: true});
    return result;
}
//DELETE