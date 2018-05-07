const charset = require("superagent-charset");
const superagent = charset(require("superagent"));
const cheerio = require("cheerio");
const iconv = require("iconv-lite");
const sendMail = require("./sendMail");
const moment = require("moment");
var Promise = require("bluebird");

var base = "http://www.booktxt.net";

async function getHtml(url) {
  let html;
  html = await superagent
    .get(url)
    .set(
      "Accept",
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8"
    )
    .set("Accept-Language", "zh,en;q=0.9,en-US;q=0.8,zh-CN;q=0.7")
    .charset("gbk")
    .then(function(res) {
      return res.text;
    })
    .catch(function(err) {
      console.log(err.message);
    });
  return html;
}

module.exports.getHtml = getHtml;

function abstract(resolve) {
  let timeBegin = moment()
    .startOf("day")
    .format("YYYY-MM-DD HH:mm:ss");
  let $ = cheerio.load(resolve);
  let updateInfo = $("p", "#info");
  let list = $("dd", "#list");
  let updateTime = updateInfo.eq(2).text();
  let index = updateTime.indexOf("：");
  updateTime = updateTime.substr(index + 1, 19);
  let bool = moment(updateTime).isAfter(timeBegin);
  if (bool) {
    return (
      base +
      list
        .eq(0)
        .find("a")
        .attr("href")
    );
  } else {
    return Promise.reject("小说未更新。。。");
  }
}

module.exports.abstract = abstract;

function sendMailer(resolve) {
  var $ = cheerio.load(resolve, {
    decodeEntities: false
  });
  let title = $(".bookname")
    .find("h1")
    .text();
  let writings = $("#content");
  sendMail(title, writings.html());
  console.log("已发送到邮箱");
}
module.exports.sendMailer = sendMailer;
