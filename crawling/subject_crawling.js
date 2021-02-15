const fs = require("fs");
const axios = require("axios");

let hrefList = [];

var jsonCraw = function () {
    let files = fs.readdirSync("../page/");
    for (let i = 0; i < files.length; i++) {
        let dataList = require("../page/" + files[i]);
        for (const data of dataList) {
            hrefList.push(data.href);
        }
    }
};
var topBookCraw = function () {
    let topBook = require("./topBook.json");
    for (const data of topBook) {
        hrefList.push(data.book_href);
    }
};
var newBookCraw = function () {
    let dataList = require("./newBook.json");
    for (const ul of dataList) {
        for (const data of ul) {
            hrefList.push(data.href);
        }
    }
};
var tagCraw = function () {
    let files = fs.readdirSync("./tag_json/");
    for (let i = 0; i < files.length; i++) {
        let dataList = require("./tag_json/" + files[i]);
        for (const data of dataList) {
            hrefList.push(data.href);
        }
    }
};
var reviewCraw = function () {
    let files = fs.readdirSync("./review/");
    for (let i = 0; i < files.length; i++) {
        let data = require("./review/" + files[i]);
        hrefList.push(data.href);
    }
};
var getAxios = function (data) {
    return axios
        .get(data, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows; U; Windows NT 6.1; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
            },
        })
        .then((response) => {
            const html = response.data;
            var name = data.split("/").slice(-2, -1);
            console.log(name);
            fs.writeFile("./subject_review/" + name + ".html", html, function (err) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("write success");
                }
            });
        })
        .catch(function (error) {
            // 请求失败处理
            console.log(error);
        });
};
// console.log(hrefList);
var crawingAfterseconds = function (data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAxios(data));
        }, Math.random() * 5000 + 30000);
    });
};
var crawing = async function (dataList) {
    for (const data of dataList) {
        await crawingAfterseconds(data);
    }
    return 1;
};
jsonCraw();
// reviewCraw();
console.log(hrefList);
crawing(hrefList);
