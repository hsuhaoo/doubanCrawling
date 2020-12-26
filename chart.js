var myHtml = fs.readFileSync("./豆瓣-排行榜.html");
var $ = cheerio.load(myHtml);
var li = $("li.media");
var liList = [];

li.each((i, elem)=>{
    var href = $(elem).find("div.media__img a").attr("href");
    var src =$(elem).find("div.media__img img").attr("src");
    var title = $(elem).find("div.media__body a").text();
    var author =$(elem).find("p.subject-abstract").text();
    var score = $(elem).find("span.font-small").text();
    var ml8 = $(elem).find("span.ml8").text();
    var price = $(elem).find(".buy-info a").text();
    liList.push({
        "src":src,
        "href":href,
        "title":title,
        "price":price,
        "year":year,
        "publisher":publisher,
    });
})