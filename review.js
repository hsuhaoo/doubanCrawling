const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

var myHtml = fs.readFileSync("豆瓣最受欢迎的书评.html");
var $ = cheerio.load(myHtml);
var a = $(".main-bd h2 a");
var href_list =[];
// a.each((i, elem) => {
//     var href = $(elem).attr("href");
//     href_list.push(href);
// });
let info = require('./bookInfo.json');
let review = require('./review.json');
info.forEach(element => {
    href_list.push(element.href);
});
review.forEach(element => {
    href_list.push(element.href);
});
// console.log(href_list);

var crawingAfterseconds= function(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var name = data.split('/').slice(-2,-1);
            console.log(name);
            resolve(axios
                .get(data)
                .then(response => {
                    const html = response.data;
                    fs.writeFile('./review/'+name+'.html', html, function(err) {
                        if (err) {
                           console.error(err);
                        }else{
                            console.log('write success');
                        }
                         
                     });
                    }
                )
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                }))
        }, 1000);
    } )
}
var crawing = async function(dataList) {
    for(const data of dataList){
        await crawingAfterseconds(data);
    }
    return 1;
}
// crawing(href_list);
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
    }
    // console.log(jsonObject);

    var jsonstr = JSON.stringify(jsonObject);
    let name = file.split(".")[0];
    console.log(name); 
    fs.writeFile('./review_json/'+name+'.json', jsonstr, function(err) {
        if (err) {
        console.error(err);
        }else{
            console.log('write success');
        }
        
    });
}
