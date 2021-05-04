const nodemailer = require("nodemailer");

module.exports.createEmailStopServices = (req, res, next) => {
    const {email, subject, apart, month, year, total_money} = req.body;
    const content = `Căn hộ ${apart} của anh/chị sẽ bị cắt điện nước vì chưa thanh toán đầy đủ chi phí điện nước của 
    tháng <b>${month}/${year}</b> với tổng số tiền cần thanh toán là <b>${total_money}</b>. Đề nghị anh/chị liên hệ BQL để giải quyết.`
    var smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        }
    });
    var mailOptions;
    mailOptions = {
        to: email,
        subject: subject,
        html: content
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.status(400).json({message:"error"});
        } else {
            console.log("Message sent: " + response.message);
            res.status(200).json({message:"Sent"});
        }
    });
}