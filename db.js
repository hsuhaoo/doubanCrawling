var MongoClient = require("mongodb").MongoClient;
let fs = require("fs");
const url = "mongodb://localhost:27017/";
function insertTag() {
    fs.readdir("./tag_json/", function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function (file) {
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db("tag");
                let dataList = require("./tag_json/" + file);
                let tag = file.slice(0, -5);
                console.log(tag);
                dbo.collection(tag).insertMany(dataList, function (err, res) {
                    if (err) throw err;
                    console.log("插入的文档数量为: " + res.insertedCount);
                    db.close();
                });
            });
        });
    });
}

function insertList(id) {
    fileDir = "./" + id + "_json/";
    let dataList = [];
    fs.readdir(fileDir, function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function (file) {
            let data = require(fileDir + file);
            dataList.push(data);
        });
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("id");
            dbo.collection("id").insertMany(dataList, function (err, res) {
                if (err) throw err;
                console.log("插入的文档数量为: " + res.insertedCount);
                db.close();
            });
        });
    });
}
function findTest() {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("subject");
        dbo.collection("subject")
            .find({
                $or: [
                    { title: { $regex: "自由" } },
                    { info: { $regex: "自由" } },
                ],
            })
            .toArray(function (err, result) {
                // 返回集合中所有数据
                if (err) throw err;
                console.log(result);
                db.close();
            });
    });
}
function insertIndex() {
    const fileDir = "./indexData/";
    fs.readdir(fileDir, function (err, files) {
        if (err) {
            return console.error(err);
        }
        files.forEach(function (file) {
            let data = require(fileDir + file);
            MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                let dbo = db.db("indexData");
                let col = file.slice(0, -5);
                if (data instanceof Array) {
                    dbo.collection(col).insertMany(data, function (err, res) {
                        if (err) {
                            console.log(data);
                            throw err;
                        }
                        console.log("插入的文档数量为: " + res.insertedCount);
                        db.close();
                    });
                } else {
                    dbo.collection(col).insertOne(data, function (err, res) {
                        if (err) throw err;
                        console.log("插入的文档数量为: " + res.insertedCount);
                        db.close();
                    });
                }
            });
        });
    });
}

insertList("review");
