var express=require('express');
var session=require('express-session');
var app=express();
// var swig=require('swig');
var UserList=[];

var http=require('http').Server(app);
var io=require('socket.io')(http);
var spider=require('./libs/spider.js');

app.use(session({
	secret:'Qtk cat',
	resave: false,
	saveUninitialized:true
}))

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
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
		console.log(user+"进入聊天室");
		UserList.push(user);
		io.emit('userList',UserList);
	});
	sock.on('chatRoom',function(msg){
		console.log(msg);
		io.emit('recmsg',msg);
		// io.emit('chatRoom,userList');
	});
	// sock.on('draw',function(msg){
	// 	io.emit('draw',msg);
	// })
})

app.get('/pic',function(req,res,next){
	console.log(req.query.word);
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
	
	// res.write(imgs);


http.listen(808,'192.168.31.177');

