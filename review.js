const fs = require("fs");
let files = fs.readdirSync("./review");
const writeFile = require("./write_file.js");

let files = fs.readdirSync("./review/");
for(const file of files){
    var myHtml = fs.readFileSync("./review/"+file);
    var $ = cheerio.load(myHtml);
    let star = $("span.main-title-hide").text();
    let val = $(".info-item-val");
    let key = $(".info-item-key");
    let info = [];
    val.each((i,elem)=>{
        info.push($(elem).text());
    });
    let infoKey = [];
    key.each((i,elem)=>{
        infoKey.push($(elem).text());
    });
    let author = $($(".info-item-val")[0]).text();
    let publish = $($(".info-item-val")[1]).text();
    let price = $($(".info-item-val")[2]).text();
    let page = $($(".info-item-val")[2]).text();
    let time = $($(".info-item-val")[3]).text();
    let src = $(".subject-img img").attr("src");
    let dataAuthor = $(".review-content").attr("data-author");
    let dataTitle = $("h1 span").text();
    let title = $(".subject-img img").attr("title");
    let href = $(".subject-title a").attr("href");
    let date = $(".main-meta").text();
    let p = $(".review-content p");
    let text = '';
    p.each((i, elem) => {
        text += $(elem).text()+"\n";
    });

    let name = file.split(".")[0];

    jsonObject = {
        "src":src,
        "title":title,
        "star":star,
        "info":info,
        "key":infoKey,
        "dataAuthor":dataAuthor,
        "dataTitle":dataTitle,
        "date":date,
        "src":src,
        "text":text,
        "href":href,
        "id": name,
    }
    // console.log(jsonObject);
    console.log(name); 

    writeFile.writeFile('./review_json/'+name+'.json',jsonObject);
}


let jsonList = [];
files.forEach((elem)=>{
    let json = require("./review/"+elem);
    json.id = elem.split(".")[0];
    json.text = json.text.slice(0,128)+"...";
    jsonList.push(json);
});
console.log(jsonList.slice(0,4));
writeFile.writeFile("review.json",jsonList.slice(0,4));