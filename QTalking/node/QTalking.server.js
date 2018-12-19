var express=require('express');
var static=require('express-static');
var session=require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var utils = require('./libs/utils.js');
var querystring = require('querystring');
var fs = require('fs')
var path=require('path');
var uuid = require('node-uuid');
var sd = require('silly-datetime');

var app=express();
// var swig=require('swig');
var UserList=[];

var http=require('http').Server(app);
var io=require('socket.io')(http);
var spider=require('./libs/spider.js');
var utils=require('./libs/utils.js');
var File=require('./libs/file.js');
var filetool=new File.file();

const db=mysql.createPool({host: '47.106.102.92',user:'levi',password:'1991',database:'qtalking'})

//handle request entity too large
// PayloadTooLargeError: request entity too large
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));
app.use(session({
	secret:'Qsession',
	name:'Qsession',
	key:utils.getkey(),
	resave: true,
	saveUninitialized:true,
	cookie:{
		maxAge:20*3600*1000,
		path:'/',
		// domain: '192.168.31.177',
		domain: '192.168.101.9',
		httpOnly: false
	}
}))
app.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://192.168.101.9:8088");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//模板引擎 swig ejs jade handle
// app.set('views','./views/');
// app.set('view engine','html');
// app.engine('html',swig.renderFile);
// app.use('/public', express.static(__dirname+'/pubic'));

//显示首页
// app.get('/',function(req,res,next){
// 	res.render('index');
// });

//确认登录，检查是否有用户名，并且用户名不能够重复
// app.get('/check',function(req,res,next){
// 	console.log(req.query.dream);
// 	var dream=req.query.dream;
// 	if(!dream){
// 		res.send('请填写您的聊天昵称');
// 		return;
// 	}
// 	if(userList.indexOf(dream)!=-1){
// 		res.send('昵称重复,请重新输入昵称');
// 		return;
// 	}
// 	userList.push(dream);
// 	req.session.dream=dream;
// 	res.redirect('/chat');  //重定向到chat
// })

//进入到聊天室
// app.get('/chat',function(req,res,next){
// 	//必须要有用户名
// 	if(!req.session.dream){
// 		res.redirect('/');
// 		return;
// 	}
// 	res.render('chat',
// 		{'dream' : req.session.dream}
// 	)
// })
io.on('connection',function(sock){
	// console.log(sock);
	sock.on('start',function(user){
		// if(!(UserList.indexOf(user)>-1)){
		if(UserList.some(item=>{
			if(item.name==user.name){
				user.old=true;
			}
		}))
		console.log('user',user);
		if(!user.old){
			console.log(user.name+"进入聊天室");
			var userInfo=user
			UserList.push(userInfo);
		}
		console.log(UserList);
		io.emit('userList',UserList);
	});
	sock.on('enter',function(user){
		io.emit('userList',UserList);
	});
	sock.on('chatRoom',function(msg){
		msg.time=utils.getTime();
		console.log(msg); 
		io.emit('recmsg',msg);
		var msgList=filetool.write('../Data/msg.json',JSON.stringify(msg),function(data){
			console.log('msg.json write'+data);
		})
		// io.emit('chatRoom,userList');
	 });
	// sock.on('draw',function(msg){
	// 	io.emit('draw',msg);
	// })
})

app.get('/pic',function(req,res,next){
	console.log(req.query.word);
	console.log( req.session);
	var word=req.query.word;
	var imgs=spider.getImgs(word,function(name,img){
		res.status(200).send(img).end();
	});
	console.log(imgs);

	// var promise=new Promise(function(resolve, reject){
	// 	var imgs=spider.getImgs(word);
	// 	console.log(imgs);
	// 	res.status(200).send(imgs).end();
	// }).then()
})

app.get('/cave',function(req,res,next){
	var caveList=filetool.line('../Data/cave.json',function(arrCave){
		// console.log(arrCave);
		res.status(200).send(arrCave).end();
	})
});
app.post('/cave',bodyParser.json(),function(req,res,next){
	console.log(typeof(req.body),req.body);
	var caveItem=JSON.stringify(req.body);
	var caveList=filetool.write('../Data/cave.json',caveItem,function(data){
		// res.status(200).send({ok:true}).end();
		var newList=filetool.line('../Data/cave.json',function(arrCave){
			res.status(200).send(arrCave).end();
		})
	})
});
	
	// res.write(imgs);
app.get('/star',function(req,res,next){
	var starList=filetool.line('../Data/star.json',function(arrStar){
		// console.log(arrCave);
		res.status(200).send(arrStar).end();
	})
});
app.post('/star',bodyParser.json(),function(req,res,next){
	// console.log(typeof(req.body),req.body.boy,req.body.girl);
	// var caveItem=JSON.stringify(req.body);
	db.query("SELECT * FROM q_star_pair WHERE boy = ? AND girl = ? ",[req.body.boy,req.body.girl], (err, data)=>{
        if(err){
            res.status(500).send('database error').end();
        }else{
            if(data.length==0){
                res.status(404).send(req.query.id+'您请求的内容不存在!').end();
            }else{
                var starInfo=data[0];
                console.log(starInfo);
                res.status(200).send(starInfo).end();
            }
        }
    });
});

app.post('/login',bodyParser.json(),function(req,res,next){
	console.log(typeof(req.body),req.body);
	// var userInfo=JSON.stringify(req.body);
	var userInfo=req.body;
	console.log(userInfo);
	console.log(req.session.user);
	//INSERT INTO `user_table` (`ID`,`username`,`PASSWORD`) VALUES(0,'levi','123')
	if(!req.session.user){
		db.query(`SELECT * FROM q_user WHERE user = '${req.body.name}'`, (err, data)=>{
	        if(err){
	        	console.log(err);
	            res.status(500).send('database error').end();
	        }else{
	            if(data.length==0){
	                db.query("INSERT INTO q_user(ID,user,sex,age,city) VALUES(0,?,?,?,?)",[req.body.name,req.body.sex,req.body.age,req.body.city], (err, data)=>{
	        	        console.log(err);
				        if(err){
	        				console.log(err);
				            res.status(500).send('database error').end();
				        }else{
							req.session.user=userInfo.name;
				            res.json({
				                result:'成功',
				                loginStatus:true
				            });
				        }
				    });
	            }else{
	            	console.log('sel',data);
	                res.status(200).send({result:'成功',loginStatus:true}).end();
	            }
	        }
	    });
	}else{
	    res.status(200).send({result:'成功',loginStatus:true}).end();
	}
	
});
app.get('/uploadimgs',function (req,res,next) {
	var msglist=db.query("SELECT * FROM q_img_msg ORDER BY add_time DESC ",(err,data)=>{
		if(err){
			res.status(500).send('database error').end();
		}else{
			console.log(data);
			res.status(200).send({result:'success',data})
		}
	})
})
app.post('/uploadimgs',bodyParser.json(),function(req,res,next){
	//接收前台POST过来的base64   image/png;base64,
    var imgData=JSON.parse(req.body.imgs)
    // imgData    =JSON.stringify(req.body.imgs).split(/^data\:image\/png\;base64\,$/g)
    // imgData    =JSON.stringify(req.body.imgs).split(',')
    var urllist=[],pms=[]
    //过滤data:URL
    imgData.forEach(it=>{
        pms.push(writefiles(it))
        // urllist.push("../media/img/"+name+".png")
    })
    Promise.all(pms).then(data=>{
        urllist=data
        insertImg(req.body.user,req.body.text,JSON.stringify(urllist)).then(
            sus=>{
                res.json({
                    result:'成功',
                    sendSuccess:true
                });
            },err=>{
                console.log(err)
                res.status(500).send('database error').end();
            }
        )
    }).catch(err=>{
        console.log(22,err)
        reject(err)
    })

});
function insertImg(user,text,imglist) {
    return new Promise((resolve, reject) => {
        var time=sd.format(Date.now()+1000*60*60*8, 'YYYY-MM-DD HH:mm:ss');
        db.query("INSERT INTO q_img_msg(id,user,text,imglist,add_time) VALUES(0,?,?,?,?)",[user,text,imglist,time], (err, data)=> {
            if (err) {
                reject(err);
            } else {
                resolve(data)
            }
        })
    });
}
var writefiles=function(file){
    return new Promise(((resolve, reject) => {
        var base64Data = file.replace(/^data:image\/\w+;base64,/, "");
        var dataBuffer = new Buffer(base64Data, 'base64');
        var name=uuid.v4();
        var filedir = ("/media/img/"+name+".png");
        fs.writeFile('./static'+filedir, dataBuffer, function(err) {
            if(err) {
                reject(err);
            }else{
                resolve(filedir)
            }
        });
    }))
}
// console.log(process.cwd());
//用户请求
// app.use('*', function(req, res, next){
//     console.log(req.query, req.body, req.cookies, req.session);
// })

app.use(static('./static/'));
// http.listen(808,'192.168.31.177');
http.listen(808,'192.168.101.9');

// ALTER USER "root"@"localhost" IDENTIFIED  BY "你的新密码";

