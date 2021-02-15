const fs = require('fs');
const axios = require('axios');

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
var getAxios = function(){
    axios
        .get(data)
        .then(response => {
            const html = response.data;
            var name = data.split('/').slice(-2,-1);
            console.log(name);
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
        });
}
var crawingAfterseconds= function(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(getAxios(data));
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