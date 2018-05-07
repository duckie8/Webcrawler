const Promise = require("bluebird");

var baseUrl = "http://www.booktxt.net";
var books = ["/2_2640", "/1_1137"];

books = books.map(uri => {
  return baseUrl + uri;
});
console.log(books);
