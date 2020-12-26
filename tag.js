var fs = require('fs');
var cheerio = require('cheerio');

var parse=function(file){
    var myHtml = fs.readFileSync("./tag/"+file);
    var $ = cheerio.load(myHtml);
    var tags = $("ul[class='subject-list'] li");
    var tags_list = [];
    tags.each((i, elem)=>{
        var src = $(elem).find("a img").attr("src");
        var href =$(elem).find(".pic a").attr("href");
        var title = $(elem).find(".info h2 a").attr("title");
        var subtitle = $(elem).find(".info h2 a span").text();
        var rating = $(elem).find(".rating_nums").text();
        var pub =  $(elem).find(".pub").text();
        var pl = $(elem).find(".pl").text();
        var abstract = $(elem).find("p").text();
        var buylinks = $(elem).find(".buy-info a").attr("href");
        var price = $(elem).find(".buy-info a").text();
        var buyhref = $(elem).find(".market-info a").attr("href");
        tags_list.push({
            "src":src,
            "href":href,
            "title":title,
            "subtitle": subtitle,
            "rating":rating,
            "pub":pub,
            "pl": pl,
            "abstract":abstract,
            "buylinks":buylinks,
            "price":price,
            "buyhref":buyhref,
        })
    });
    var jsonstr = JSON.stringify(tags_list);

    //将修改后的内容写入文件
    fs.writeFile('./tag_json/'+file.slice(0,-4)+".json", jsonstr, function(err) {
        if (err) {
        console.error(err);
        }else{
            console.log('write success');
        }
        
    });
}
// console.log(tags_list);
fs.readdir("./tag/",function(err, files){
    if (err) {
        return console.error(err);
    }
    files.forEach( function (file){
        parse(file)
    });
 });

