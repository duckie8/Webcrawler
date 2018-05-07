const getHtml = require("./crawlerWeb").getHtml;
const abstract = require("./crawlerWeb").abstract;
const sendMailer = require("./crawlerWeb").sendMailer;
const schedule = require("node-schedule");
var Promise = require("bluebird");

var baseUrl = "http://www.booktxt.net";
var books = ["/2_2640/", "/1_1137/"];
var minute = [];
var hour = [11, 15, 17, 22];

for (let index = 0; index < 60; index++) {
  minute.push(index);
}

var rule = new schedule.RecurrenceRule();
rule.minute = minute;
rule.hour = hour;

books = books.map(uri => {
  return baseUrl + uri;
});

var j = schedule.scheduleJob(rule, function() {
  books.map(ur => {
    getHtml(ur)
      .then(abstract)
      .then(getHtml)
      .then(sendMailer)
      .catch(err => {
        console.log(err);
      });
  });
});
