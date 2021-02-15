const fs = require("fs");

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
module.exports.writeFile = writeFile;