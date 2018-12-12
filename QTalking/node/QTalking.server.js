var express=require('express');
var static=require('express-static');
var session=require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var utils = require('./libs/utils.js');

var app=express();
// var swig=require('swig');
var UserList=[];

var http=require('http').Server(app);
var io=require('socket.io')(http);
var spider=require('./libs/spider.js');
var utils=require('./libs/utils.js');
var File=require('./libs/file.js');
var filetool=new File.file();

const db=mysql.createPool({host: 'localhost',user:'root',password:'root',database:'qtalking'})

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
	secret:'Qsession',
	name:'Qsession',
	key:utils.getkey(),
	resave: true,
	saveUninitialized:true,
	cookie:{
		maxAge:20*3600*1000,
		path:'/',
		domain: '192.168.31.177',
		httpOnly: false
	}
}))

app.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "http://192.168.31.177:808");
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
// console.log(process.cwd());
//用户请求
// app.use('*', function(req, res, next){
//     console.log(req.query, req.body, req.cookies, req.session);
// })

app.use(static('./static/'));
http.listen(808,'192.168.31.177');

// ALTER USER "root"@"localhost" IDENTIFIED  BY "你的新密码";

