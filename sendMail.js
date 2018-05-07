const nodemailer = require("nodemailer");

var mailTransport = nodemailer.createTransport({
  host: "smtp.qq.com",
  secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
  auth: {
    user: "******@qq.com",
    pass: ""
  }
});

function sendMail(title, msg) {
  var options = {
    from: '"Node小说爬虫🐞" 871593867@qq.com',
    to: "871593867@qq.com",
    subject: title,
    text: "吕先森您追的小说更新啦",
    html: msg
    // attachments: [
    //   {
    //     filename: "", // 改成你的附件名
    //     path: "", // 改成你的附件路径
    //     cid: "00000001" // cid可被邮件使用
    //   },
    //   {
    //     filename: "", // 改成你的附件名
    //     path: "", // 改成你的附件路径
    //     cid: "00000002" // cid可被邮件使用
    //   }
    // ]
  };

  mailTransport.sendMail(options, function(err, msg) {
    if (err) {
      console.log(err);
    } else {
      console.log(msg);
    }
  });
}

module.exports = sendMail;
