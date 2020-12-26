const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');

let hrefList = [];
let topBook = require('./topBook.json')

var jsonCraw = function() { 
    let files = fs.readdirSync("./json/");
    for(let i=0; i<files.length;i++) {
        let dataList = require("./json/"+files[i]);
        for(const data of dataList){
            hrefList.push(data.href);
        }
    }
}
var topBookCraw = function() { 
for(const data of topBook){
    hrefList.push(data.book_href);
}
}
var newBookCraw = function() { 
    let dataList = require("./newBook.json");
        for(const ul of dataList){
            for(const data of ul){
                hrefList.push(data.href);
            }
    }
}
var tagCraw = function() { 
    let files = fs.readdirSync("./tag_json/");
    for(let i=0; i<files.length;i++) {
        let dataList = require("./tag_json/"+files[i]);
        for(const data of dataList){
            hrefList.push(data.href);
        }
    };
}  
tagCraw();
// console.log(hrefList);
var crawingAfterseconds= function(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var name = data.split('/').slice(-2,-1);
            console.log(name);
            resolve(axios
                .get(data,{
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50'
                    }
                })
                .then(response => {
                    const html = response.data;
                    fs.writeFile('./subject/'+name+'.html', html, function(err) {
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
        }, Math.random()*5000+30000);
    } )
}
var crawing = async function(dataList) {
    for(const data of dataList){
        await crawingAfterseconds(data);
    }
    return 1;
}
let files = fs.readdirSync("./subject/");
hrefList = hrefList.filter((elem)=>{
    return !files.includes(elem.split('/').slice(-2,-1)+'.html');
});
console.log(hrefList);
crawing(hrefList);
// var myHtml = fs.readFileSync("./subject/6712407.html");
// var $ = cheerio.load(myHtml);
// let title = $("h1 span").text();
// let author  = $($("#info span a")[0]).text();
// let publish = $($("#info span a")[0]).text();
// // $("#info span").remove();
// let info = $("#info").text().replace(/ */g,"").split("\n").filter(elem=>elem.length>0);
// let score = $(".rating_num").text();
// let vote = $(".rating_num span").text();
// if(vote.match(/[0-9]+/)){
//     vote += "人评价";
// }
// let ratingList = [];
// let ratingPer = $(".rating_per span").text();
// ratingPer.search((i,elem)=>{
//     ratingList.push($(elem).text());
// });
// let p = $("#link-report .short .intro p");
// p.find("a").remove();
// let introSummary = '';
//     p.each((i, elem) => {
//         introSummary += $(elem).text()+"\n";
//     });
// console.log(introSummary);
// p = $("#link-report .all .intro p");
// let intro = '';
//     p.each((i, elem) => {
//         intro += $(elem).text()+"\n";
//     });
// console.log(intro);
// p = $(".indent div .intro p");
// let authorIntro = '';
//     p.each((i, elem) => {
//         authorIntro += $(elem).text()+"\n";
//     });
// console.log(authorIntro);
// src = $(".nbg").attr("href");
// jsonObject = {
//     "src":src,
//     "title":title,
//     "author":author,
//     "publish":publish,
//     "info":info,
//     "score":score,
//     "vote":vote,
//     "ratingPer":ratingPer,
//     "introSummary":introSummary,
//     "intro":intro,
//     "authorIntro":authorIntro,
//     "src":src,
// }
// var jsonstr = JSON.stringify(jsonObject);

// fs.writeFile('./subject.json', jsonstr, function(err) {
//     if (err) {
//        console.error(err);
//     }else{
//         console.log('write success');
//     }
     
//  });
