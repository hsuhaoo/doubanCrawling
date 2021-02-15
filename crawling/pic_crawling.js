const request = require('request');
const axios = require('axios');
let fs=require("fs");


var getAxios = function(data){
    var name = data.split('/').slice(-1);
    let writer = fs.createWriteStream('./picture/'+name);
    return axios
    .get(data,{
        responseType: 'stream'
        })
    .then(response => {
        response.data.pipe(writer);
        }
    )
    .catch(function (error) { // 请求失败处理
        console.log(error);
    });
}

var crawlingAfterseconds= function(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAxios(data));
        }, 5000);
    } )
}
var picResult = async function(dataList) {
    for(const data of dataList){
        await crawlingAfterseconds(data);
    }
}


// let Crawler = require('crawler');
// var c = new Crawler({
//     encoding:null,
//     jQuery:false,// set false to suppress warning message.
//     rateLimit: 1000,
//     callback:function(err, res, done){
//         if(err){
//             console.error(err.stack);
//         }else{
//             fs.createWriteStream('./picture1/'+res.options.filename).write(res.body);
//         }
        
//         done();
//     }
// });


// var getSrc = function() {
//     let srcList = []; 
//     let files = fs.readdirSync("./json/");
//     for(let i=0; i<files.length;i++) {
//         let dataList = require("./json/"+files[i]);
//         for(const data of dataList){
//             if (data.src !== undefined){ 
//                 uri = data.src.match(/https:.*(webp|jpg)/i)[0];
//                 console.log(uri);
//             }
//             else{
//                 uri = data.style.match(/https:.*(webp|jpg)/i)[0];
//             }
//             srcList.push(uri);
//         }
//     };
//     // console.log(srcList);
// }  

var getSrc = function() {
    let srcList = []; 
    let files = fs.readdirSync("../review_json/");
    for(let i=0; i<files.length;i++) {
        let data = require("../review_json/"+files[i]);
        if (data.src !== undefined){ 
            uri = data.src.match(/https:.*(webp|jpg)/i)[0];
            console.log(uri);
        }
        else{
            uri = data.style.match(/https:.*(webp|jpg)/i)[0];
        }
        srcList.push(uri);
    };
    return srcList;
    // console.log(srcList);
}  

var pageCraw = function() { 
    let srcList = [];
    let files = fs.readdirSync("../page/json/");
    for(let i=0; i<files.length;i++) {
        let dataList = require("../page/json/"+files[i]);
        for(const data of dataList){
            srcList.push({uri:data.src,filename:data.src.split('/').slice(-1)});
            // srcList.push({uri:data.src,filename:data.src.match(/[0-9]+.jpg/i).slice(-1)});
        }
    };
    console.log(srcList);
    return srcList;
}  


var jsonCraw = function() { 
    let srcList = [];
    let files = fs.readdirSync("./json/");
    for(let i=0; i<files.length;i++) {
        let dataList = require("./json/"+files[i]);
        for(const data of dataList){
            srcList.push({uri:data.src,filename:data.src.split('/').slice(-1)});
            // srcList.push({uri:data.src,filename:data.src.match(/[0-9]+.jpg/i).slice(-1)});
        }
    };
    console.log(srcList);
    return srcList;
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

picResult(getSrc());
