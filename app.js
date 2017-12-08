var express=require("express");
var app=express();
var fs=require("fs");
var path=require("path");
var formidable=require("formidable");
var _=require("underscore");
// 静态化 www文件夹
app.use(express.static("www"));
app.get("/api/car/:carname",(req,res)=>{
    //获取汽车的名字
    var carname=req.params.carname;
    //获取完整的路径
    var dirpath=path.resolve(__dirname,"www/carpic/",carname);
    //接口
    var results={"name":carname,"colors":{}};
    //读取文件夹的所有的文件夹的名字
    fs.readdir(dirpath,(err,colornames)=>{
        colornames.forEach((colorname)=>{
            var o={};
            //异步的读取中写到同步的读取
            var typenames=fs.readdirSync(path.resolve(dirpath,colorname));
            typenames.forEach((typename)=>{
                //读取图片名字
                var images=fs.readdirSync(path.resolve(dirpath,colorname,typename));
                o[typename]=images;
            });
            results.colors[colorname]={"types":o};
    })
    res.json(results)
    })
});
//汽车查询
app.post("/cars",(req,res)=>{
    fs.readFile("./db/cardata.json",(err,data)=>{
        var form=new formidable.IncomingForm();
        form.parse(req,(err,fileds)=>{
            const filters=JSON.parse(fileds.filters);
            var list=JSON.parse(data.toString()).list;
            const {current,total,pageSize,field,order}=JSON.parse(fileds.paginations);
            //遍历
            filters.forEach((filter)=>{
                switch (filter.name) {
                    case "country":
                        list=list.filter((car)=>{
                            return filter.value.includes(car.country);
                        })
                        break;
                    case "brand":
                        list=list.filter((car)=>{
                            return filter.value.includes(car.brand)
                        })
                        break;
                    case "seat":
                        list=list.filter((car)=>{
                            return filter.value.includes(car.seat)
                        })
                        break;
                    case "type":
                        list=list.filter((car)=>{
                            return filter.value.includes(car.type)
                        })
                        break;
                    case "price":
                        list=list.filter((car)=>{
                            return car.price<filter.value.b&&car.price>filter.value.a
                        })
                        break;
                    case "date":
                        list=list.filter((car)=>{
                            const cardata=new Date(car.date);
                            return cardata<new Date(filter.value.b)&&cardata>new Date(filter.value.a)
                        })
                        break;
                }
            });
            //排序接口
            if (order=="descend") {
                list=_.sortBy(list,field)
            }else {
                list=_.sortBy(list,field).reverse();
            }
            res.json({"total":list.length,

                    "cars":list.slice(pageSize*(current-1),pageSize*current)
        });
        })
    })
})
app.listen(3000);
console.log(3000);