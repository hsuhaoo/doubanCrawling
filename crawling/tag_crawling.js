const request = require("request");
const axios = require("axios");
const fs = require("fs");
const writeFile = require("./write_file.js");
function getAxios(tag) {
    return axios
        .get(encodeURI("https://book.douban.com/tag/" + tag))
        .then((response) => {
          fs.writeFile('/tag/'+tag+'.html', response.data);

        })
        .catch(function (error) {
            console.log(error);
        });
}

function crawl(tag) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAxios( ))
        }, 5000);
    });
}

function getTag() {
    var fs = require("fs");
    var cheerio = require("cheerio");
    var myHtml = fs.readFileSync("all_tag.html");
    var $ = cheerio.load(myHtml);
    var hotTag = $("a.tag-title-wrapper");
    var aList = [];
    hotTag.each((i, elem) => {
        var title = $(elem).find("h2").text();
        var tag = $(elem).nextAll().find("td a");
        var num = $(elem).nextAll().find("td b");
        var tag_list = [];
        var num_list = [];
        tag.each((i, elem) => {
            var tagName = $(elem).text();
            tag_list.push(tagName);
        });
        num.each((i, elem) => {
            var numName = $(elem).text();
            num_list.push(numName);
        });
        aList.push({
            title: title,
            tag_list: tag_list,
            num_list: num_list,
        });
    });
    return aList;
}


async function crawlResult() {
    allTag = getTag();
    for (const section of allTag) {
        for(const tag of section.tag_list)
            await crawl(tag);
    }
}

function writeFile(fileName, data){
    var jsonstr = JSON.stringify(data);
    fs.writeFile(fileName, jsonstr, function(err) {
        if (err) {
        console.error(err);
        }else{
            console.log('write success');
        }
    });
}
// crawlResult();

allTag = getTag();
writeFile("alltag.json", allTag);
