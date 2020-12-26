const request = require('request');
const axios = require('axios');
let fs=require("fs");
// let dataList = require('./tag_json/小说.json');
// let picList = [];
// for (const data of dataList){
//     console.log(data.src);
// }
// function sleep(n) {
//     Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
//   }
// var doubleAfter2seconds= function(data) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             var name = data.src.split('/').slice(-1);
//             const writer = fs.createWriteStream('./picture/'+name);
//             resolve(axios
//                 .get(data.src,{
//                     responseType: 'stream'
//                     })
//                 .then(response => {
//                     response.data.pipe(writer);
//                     }
//                 )
//                 .catch(function (error) { // 请求失败处理
//                     console.log(error);
//                 }))
//         }, 1000);
//     } )
// }
// function getData(data){
//     var name = data.src.split('/').slice(-1);
//     let writer = fs.createWriteStream('./picture/'+name);
//     axios
//     .get(data.src,{
//         responseType: 'stream'
//         })
//     .then(response => {
//         response.data.pipe(writer);
//         }
//     )
//     .catch(function (error) { // 请求失败处理
//         console.log(error);
//     });
// }


// // var testResult= async function(data) {
// //     return new Promise((resolve, reject) => {
// //         setTimeout(() => {
// //             for(const data of dataList){
// //                 await doubleAfter2seconds(data);
// //             }
// //             resolve()
// //         }, 1000);
// //     } )
// // }
// var testResult = async function(dataList) {
//     for(const data of dataList){
//         await doubleAfter2seconds(data);
//     }
//     return 1;
// }

// var test1 =  function(data) {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(testResult(data));
//             }, 30000);
//         } )
//     }

let Crawler = require('crawler');
var c = new Crawler({
    encoding:null,
    jQuery:false,// set false to suppress warning message.
    rateLimit: 1000,
    callback:function(err, res, done){
        if(err){
            console.error(err.stack);
        }else{
            fs.createWriteStream('./picture1/'+res.options.filename).write(res.body);
        }
        
        done();
    }
});


let srcList = [];
var tagCraw = function() { 
    let files = fs.readdirSync("./tag_json/");
    for(let i=0; i<files.length;i++) {
        let dataList = require("./tag_json/"+files[i]);
        for(const data of dataList){
            srcList.push({uri:data.src,filename:data.src.split('/').slice(-1)});
        }
    };
    console.log(srcList);
}  
var jsonCraw = function() { 
    let files = fs.readdirSync("./json/");
    for(let i=0; i<files.length;i++) {
        let dataList = require("./json/"+files[i]);
        for(const data of dataList){
            srcList.push({uri:data.src,filename:data.src.split('/').slice(-1)});
            // srcList.push({uri:data.src,filename:data.src.match(/[0-9]+.jpg/i).slice(-1)});
        }
    };
    console.log(srcList);
}  
// test();
// for(const src of srcs){
//     srcList.push({uri:src,filename:src.split('/').slice(-1)});
// }
var bookInfoCraw = function() { 
    let dataList = require("./bookInfo.json");
    for(const data of dataList){
        try {
            uri = data.style.match(/https:.*[webp|jpg]/i)[0];
        }
        catch(err){
            console.log(err);
        }
        console.log(uri);
        srcList.push({uri:uri,filename:uri.split('/').slice(-1)});
    }
    console.log(srcList);
}  

var newBookCraw = function() { 
    let dataList = require("./newBook.json");
    for(const ul of dataList){
        for(const data of ul){
            srcList.push({uri:data.src,filename:data.src.split('/').slice(-1)});
        }
    }
    console.log(srcList);
}  

jsonCraw();
c.queue(srcList);