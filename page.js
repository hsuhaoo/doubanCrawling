
const fs = require('fs');
const cheerio = require('cheerio');
var myHtml = fs.readFileSync("./top250.html");
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

writeFile.writeFile('./top.json',liList);


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

// var jsonstr = JSON.stringify(liList);

writeFile.writeFile('./unreal.json',liList);

