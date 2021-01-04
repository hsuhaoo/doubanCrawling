const fs = require('fs');
const cheerio = require('cheerio');
var myHtml = fs.readFileSync("./unreal.html");
var $ = cheerio.load(myHtml);
var li = $("li.media");
var liList = [];

li.each((i, elem)=>{
    var href = $(elem).find("div.media__img a").attr("href");
    var src =$(elem).find("div.media__img img").attr("src");
    var title = $(elem).find("div.media__body h2 a").text();
    var author =$(elem).find("p.subject-abstract").text();
    var score = $(elem).find("span.font-small").text();
    var ml8 = $(elem).find("span.ml8").text();
    var price = $(elem).find("span.buy-info a").text();
    var ebook = $(elem).find(".ebook-link").length > 0;
    liList.push({
        "src":src,
        "href":href,
        "title":title,
        "price":price,
        "author":author,
        "score":score,
        "ml8":ml8,
        "ebook":ebook,
    });
});

var jsonstr = JSON.stringify(liList);

fs.writeFile('./unreal.json', jsonstr, function(err) {
    if (err) {
       console.error(err);
    }else{
        console.log('write success');
    }
     
 });