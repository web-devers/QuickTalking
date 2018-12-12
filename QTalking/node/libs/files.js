var cave=require('./cave.js');
var fs = require('fs');
var os = require('os');
var path = require('path');//解析需要遍历的文件夹
var readline = require('readline');
//调用文件遍历方法


var filePatha = path.resolve(__dirname,'../Data/test.json');
var filePathb = path.resolve(__dirname,'../Data/test1.json');

var fRead = fs.createReadStream(filePatha); 
var fWrite = fs.createWriteStream(filePathb); 
const rl = readline.createInterface({
  input: fRead,
  output: fWrite,
  terminal: true
});


var enableWriteIndex = true; 
fRead.on('end', ()=>{ 
 console.log('end');
 enableWriteIndex = false; 

 fs.appendFile(filePathb,'\nend of file',function(res){
    console.log(res);
 });
});

var index = 1;
rl.on('line', (line)=>{
     if(!enableWriteIndex) { 
         index ++; 
         var tmp = index.toString() + ':'; 
         console.log(1);
     }
}); 



rl.on('close', ()=>{ 
 console.log('readline close...'); 
}); 





// fs.open(filePath,'r',function(err,fd){
//     var buf = new Buffer(225);
//     //读取fd文件内容到buf缓存区
//     fs.read(fd,buf,0,9,3,function(err,bytesRead,buffer){
//         console.log(buf.slice(0,bytesRead).toString('utf-8'));
//     }); 
//     var buff = new Buffer(225);
//     //位置设置为null会默认从文件当前位置读取
//     fs.read(fd,buff,0,3,null,function(err,bytesRead,buffer){
//         console.log(buff.slice(0,bytesRead).toString());
//     });

//     var buffer = new Buffer(225);
//     //同步方法读取文件
//     var bytesRead = fs.readFileSync(fd,buffer,0,9,3);
//     console.log(bytesRead);
//     console.log(buffer.slice(0,bytesRead).toString());
// });

// fileDisplay(filePath);
//文件遍历方法
function fileDisplay(filePath){
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath,function(err,files){
        if(err){
            console.warn(err)
        }else{
            //遍历读取到的文件列表
            files.forEach(function(filename){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir,function(eror, stats){
                    if(eror){
                        console.warn('获取文件stats失败');
                    }else{
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if(isFile){
                            console.log(filedir);
　　　　　　　　　　　　　　　　　// 读取文件内容
                            var content = fs.readFileSync(filedir, 'utf-8');
                            console.log(content);
                        }
                        if(isDir){
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                    }
                })
            });
        }
    });
}



// 如果碰到有中文不能解析的html，这样写
// var cheerio = require('cheerio');
// var iconv = require('iconv-lite');
// var myHtml = fs.readFileSync("index.html");
// var myHtml2 = iconv.decode(myHtml, 'gbk');
// console.log(myHtml2);