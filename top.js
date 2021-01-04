const fs = require('fs');
const cheerio = require('cheerio');
var myHtml = fs.readFileSync("./豆瓣读书Top250.html");
var $ = cheerio.load(myHtml);
var li = $("tr.item");
var liList = [];

li.each((i, elem)=>{
    var href = $(elem).find("div.pl2 a").attr("href");
    var src =$(elem).find(".nbg img").attr("src");
    var title = $(elem).find("div.pl2 a").text();
    var author =$(elem).find("p.pl").text();
    var score = $(elem).find("span.rating_nums").text();
    var pl = $(elem).find("span.pl").text();
    var inq = $(elem).find("span.inq").text();
    var entitle = $(elem).find(".pl2 span").text();
    liList.push({
        "src":src,
        "href":href,
        "title":title,
        "pl":pl,
        "author":author,
        "score":score,
        "inq":inq,
        "entitle":entitle,
    });
});
console.log(liList);
var jsonstr = JSON.stringify(liList);

fs.writeFile('./top.json', jsonstr, function(err) {
    if (err) {
       console.error(err);
    }else{
        console.log('write success');
    }
     
 });