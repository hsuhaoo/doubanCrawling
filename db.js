var MongoClient = require('mongodb').MongoClient;
let fs=require("fs");
var url = "mongodb://localhost:27017/";
fs.readdir("./tag_json/",function(err, files){
    if (err) {
        return console.error(err);
    }
    files.forEach( function (file){
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("tag");
            let dataList = require('./tag_json/'+file);
            let tag = file.slice(0,-5); 
            console.log(tag);
            dbo.collection(tag).insertMany(dataList, function(err, res) {
                if (err) throw err;
                console.log("插入的文档数量为: " + res.insertedCount);
                db.close();
            });
        });
    });
 });
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("tag");
//     dbo.collection("小说").insertMany(dataList, function(err, res) {
//         if (err) throw err;
//         console.log("插入的文档数量为: " + res.insertedCount);
//         db.close();
//     });
// });
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("tag");
//     dbo.collection("小说"). find({}).toArray(function(err, result) { // 返回集合中所有数据
//         if (err) throw err;
//         console.log(result);
//         db.close();
//     });
// });