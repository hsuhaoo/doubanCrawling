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
var myHtml = fs.readFileSync("./review/12928567.html");
var $ = cheerio.load(myHtml);
let star = $("span.main-title-hide").text();
let author = $($(".info-item-val")[0]).text();
let publish = $($(".info-item-val")[1]).text();
let page = $($(".info-item-val")[2]).text();
let time = $($(".info-item-val")[3]).text();
let src = $(".subject-img img").attr("src");
let dataAuthor = $(".review-content").attr("data-author");
let dataTitle = $("h1 span").text();
let title = $(".subject-title a").text();
let date = $(".main-meta").text();
let p = $(".review-content p");
let text = '';
console.log(p);
p.each((i, elem) => {
    text += $(elem).text()+"\n";
});

jsonObject = {
    "src":src,
    "title":title,
    "author":author,
    "publish":publish,
    "page":page,
    "star":star,
    "time":time,
    "dataAuthor":dataAuthor,
    "dataTitle":dataTitle,
    "intro":intro,
    "date":date,
    "src":src,
    "text":text,
}
var jsonstr = JSON.stringify(jsonObject);

fs.writeFile('./review_all.json', jsonstr, function(err) {
    if (err) {
       console.error(err);
    }else{
        console.log('write success');
    }
     
 });
