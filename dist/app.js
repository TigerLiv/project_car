"use strict";

var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
// 静态化 www文件夹
app.use(express.static("www"));
app.get("/api/car/:carname", function (req, res) {
    //获取汽车的名字
    var carname = req.params.carname;
    //获取完整的路径
    var dirpath = path.resolve(__dirname, "www/carpic/", carname);
    //接口
    var results = { "name": carname, "colors": {} };
    //读取文件夹的所有的文件夹的名字
    fs.readdir(dirpath, function (err, colornames) {
        colornames.forEach(function (colorname) {
            var o = {};
            //异步的读取中写到同步的读取
            var typenames = fs.readdirSync(path.resolve(dirpath, colorname));
            typenames.forEach(function (typename) {
                //读取图片名字
                var images = fs.readdirSync(path.resolve(dirpath, colorname, typename));
                o[typename] = images;
            });
            results.colors[colorname] = { "types": o };
        });
        res.json(results);
    });
});
app.listen(3000);
console.log(3000);
//# sourceMappingURL=app.js.map