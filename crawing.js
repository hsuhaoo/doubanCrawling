const request = require('request');
function sleep(delay) {
  for(var t = Date.now(); Date.now() - t <= delay;);
}
var craw = (tag) => {
  request(encodeURI('https://book.douban.com/tag/'+tag), function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    // fs.writeFileSync(tag+'.txt', body);
  });
};
var fs = require('fs');
var cheerio = require('cheerio');

var myHtml = fs.readFileSync("all_tag.html");
var $ = cheerio.load(myHtml);
var hotTag = $("a.tag-title-wrapper")
var a_list =[];
hotTag.each((i, elem) => {
    var title = $(elem).find("h2").text();
    var tag = $(elem).nextAll().find("td a");
    var num = $(elem).nextAll().find("td b");
    var tag_list = [];
    var num_list = [];
    tag.each((i,elem)=>{
        var tagName = $(elem).text();
        tag_list.push(tagName);
    });
    num.each((i,elem)=>{
      var numName = $(elem).text();
      num_list.push(numName);
  });
    a_list.push({
        "title":title,
        "tag_list":tag_list,
        "num_list":num_list,
    });
});
a_list.forEach((elem)=>{
  elem.tag_list.forEach((elem)=>{
    sleep(3000);
    // console.log('https://book.douban.com/tag/'+elem);
    console.log(typeof ('https://book.douban.com/tag/'+elem));
    // craw(elem);
  });
});
// request(encodeURI('https://book.douban.com/tag/小说'), function (error, response, body) {
//     console.error('error:', error); // Print the error if one occurred
//     // fs.writeFileSync(tag+'.txt', body);
//     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//     console.log('body:', body); // Print the HTML for the Google homepage.
//   });
