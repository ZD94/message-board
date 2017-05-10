/**
 * Created by hama on 2017/4/1.
 */

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var form = multer();
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

/*路由开始*/
app.get('/message',function(req,res){
    //1.检查一下data里面有没有message.txt文件
    fs.exists('data/message.txt',function(exists){
        //2.读取message.txt文件
        fs.readFile('data/message.txt',function(err,data){
            if(!err){
                //如果读取成功的话
                //将所有的数据组成一个数组
                var result = '[' + data;
                result = result.substr(0,result.length - 1)
                result = result + ']';
                res.status(200).send(result);
            }else{
                //读取失败的话
                res.status(200).send('[]');
            }
        })
    })
})

//设计把表单的内容添加到某个.txt的文件里面去.
app.post('/add',form.array(),function(req,res){
    //发送过来的数据是req.body
    //想办法将req.body的内容+当前发布时间+IP地址存储到.txt文件里面去
    //注意一点，存储的时候，添加一个,作为分隔符

    //获取留言的内容
    var content = req.body.content;
    //console.log(content);
    //整合一下
    var message = {
        content,
        date:new Date(),
        ip:req.ip
    }
    fs.exists('data',function(exists){
        if(!exists){
            fs.mkdirSync('data');
        }
    })
    fs.appendFile('data/message.txt',JSON.stringify(message) + ',',function(err){
        if(err){
            console.error(err);
        }
    })
    res.status(200).json({message:"留言成功"});
})
app.listen(3000,function(){
    console.log('node is OK');
})


