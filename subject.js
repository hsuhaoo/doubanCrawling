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
// hrefList = hrefList.filter((elem)=>{
//     return !files.includes(elem.split('/').slice(-2,-1)+'.html');
// });
// console.log(hrefList);
// crawing(hrefList);
for(const file of files){
    var myHtml = fs.readFileSync("./subject/"+file);
    var $ = cheerio.load(myHtml);
    let title = $("h1 span").text();
    // $("#info span").remove();
    let info = $("#info").text().replace(/ */g,"").split("\n").filter(elem=>elem.length>0);
    for(let i=info.length-1;i>=0;i--){
        if(!(info[i].search(/:/)>0)){
            info[i-1] = info[i-1]+info[i];
            info[i] = null;
        }
    }
    info = info.filter(elem=>elem !== null);
    // info[1] = info[0]+info[1];
    // info.shift();
    let score = $(".rating_num").text();
    let vote = $(".rating_people span").text();
    if(vote.match(/[0-9]+/)){
        vote += "人评价";
    }
    let ratingList = [];
    let ratingPer = $("span.rating_per");
    ratingPer.each((i,elem)=>{
        ratingList.push($(elem).text());
    });
    let p =  $($("#link-report .intro")[0]).find("p");
    p.find("a").remove();
    let introSummary = '';
        p.each((i, elem) => {
            introSummary += $(elem).text()+"\n";
        });
    // console.log(introSummary);
    p = $("#link-report .all .intro p");
    let intro = '';
        p.each((i, elem) => {
            intro += $(elem).text()+"\n";
        });
    // console.log(intro);
    if(p.length>0){
        p = $($(".indent .intro")[2]).find("p");
    }
    else{
        p = $($(".indent .intro")[1]).find("p");
    }
    let authorIntro = '';
        p.each((i, elem) => {
            authorIntro += $(elem).text()+"\n";
        });
    // console.log(authorIntro);
    src = $(".nbg").attr("href");
    $(".indent[style='display:none'] a").remove();
    let dir = $(".indent[style='display:none']").text().replace(/ */g,"");
    jsonObject = {
        "src":src,
        "title":title,
        "info":info,
        "score":score,
        "vote":vote,
        "ratingPer":ratingList,
        "introSummary":introSummary,
        "intro":intro,
        "authorIntro":authorIntro,
        "dir":dir,
    }
    
    for(let infoElem of info){
        let key = infoElem.split(":")[0];
        let val = infoElem.split(":")[1];
        jsonObject[key] = val;
    }
    var jsonstr = JSON.stringify(jsonObject);
    let name = file.split(".")[0];
    fs.writeFile('./subject_json/'+name+'.json', jsonstr, function(err) {
        if (err) {
        console.error(err);
        }else{
            console.log('write success');
        }
        
    });
}
