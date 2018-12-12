var fs = require('fs');
var os = require('os');
var path = require('path');//解析需要遍历的文件夹
var readline = require('readline');
//调用文件遍历方法


class file{
    readFile(filename,cb){
        var filePath = path.resolve(__dirname,filename);
        fs.readFile(filePath, 'utf8', function(err, data){
            console.log(err,data);
            cb(data);  
        });        
    }
    line(filename,cb){
        var arrCave=[];
        var filePath = path.resolve(__dirname,filename);
        console.log(__dirname);
        var fRead = fs.createReadStream(filePath); 
        // var fWrite = fs.createWriteStream(filePathb); 
        const rl = readline.createInterface({
          input: fRead,
          // output: fWrite,
          // terminal: true
        });
        // var index = 1;
        var enableWriteIndex = true; 
        rl.on('line', (line)=>{
             // var tmp={};
             if(enableWriteIndex) { 
                 // index ++; 
                 // var tmp = index.toString() + ':'; 
                 // tmp=line;
                 arrCave.push(line);
                 // console.log(typeof(tmp),tmp);
             }
        }); 
        fRead.on('end', ()=>{ 
             console.log('end');
             enableWriteIndex = false; 
            console.log(arrCave);
            cb(arrCave);

        });
        rl.on('close', ()=>{
            console.log('readline close...'); 
        }); 
    }
    write(filename,data,cb){
        console.log('write');
        var filePath = path.resolve(__dirname,filename);
        fs.appendFile(filePath,'\n'+data,function(res){
           cb("success");
           console.log('write done');
        });
    }
}
module.exports={
    file
}








