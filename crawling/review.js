const fs = require("fs");
let files = fs.readdirSync("./review");
const writeFile = require("./write_file.js");

let jsonList = [];
files.forEach((elem)=>{
    let json = require("./review/"+elem);
    json.id = elem.split(".")[0];
    json.text = json.text.slice(0,128)+"...";
    jsonList.push(json);
});
console.log(jsonList.slice(0,4));
writeFile.writeFile("review.json",jsonList.slice(0,4));