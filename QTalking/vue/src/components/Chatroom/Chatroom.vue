<template>
	<div class="chatRoom">
		<div class="back">
			<i @click="back">
				<img src="../../assets/img/1_05.png"></i>
			<p @click='listUser'>聊天室({{userList.length}}人)</p>
		</div>
		<div class="content" ref="chatWrapper" >
			<ul class="chatList">
				<li class="word" v-for="(item,index) in msgList" >
					<div>
						<p class="tm">{{item.tm}}</p>
					</div>
					<div class="chatW">
						<i class="fr clear" v-show="item.my">{{item.nm}}</i>
						<p class="fr clear" v-show="item.my">{{item.my}}</p>
						<i class="fl clear" v-show="item.ot">{{item.nm}}</i>
						<p class="fl clear" v-show="item.ot">{{item.ot}}</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="input">
			<mt-field placeholder="" v-model="msg">
			</mt-field>
			<mt-button type="primary" @click="send">发送</mt-button>
		</div>
		<div class="background" v-show='listShow'></div>
		<div class="list" v-show='listShow'>
			<p @click='listUser'>X</p>
			<ul>
				<li v-for='item in userList'>
					{{item.name}}
					{{item.sex}}
					{{item.age}}
					{{item.city}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BSscroll from 'better-scroll'
	export default {
	  name: 'home',
	  props:{
	  	user: {
	  		type: Object
	  	}
	  },
	  data () {
	    return {
	      msgList:[],
	      msg:'Welcome to Qtalk App home',
	      listHeight:null,
	      username:null,
	      userList:[],
	      listShow:false
	    }
	  },
	  created(){
	  	this.$nextTick(()=>{
            this.scroll = new BSscroll(this.$refs.chatWrapper, {
            	click: true
       		});
        });
	  },
	  mounted(){
			// var reg=/(\/\w+):(\w+)/;
			var reg=/(\/\w+):([\u4e00-\u9fa5_a-zA-Z0-9]+$)/;
			console.log(this.$route.path);
			// console.log(this.$route.path.match(reg));
			this.username=this.$route.path.match(reg)[2];
			this.msg=`大家好我是${this.username}!`;
			if(localStorage.getItem(this.username+'chat')){
				this.msgList
				=JSON.parse(localStorage.getItem(this.username+'chat'));
			}
			// this.tp=this.$route.path.match(reg)[4];
			// this.$emit('hide','true')
			// this.$socket.emit('start',this.username);//触发start
            this.$socket.emit('enter',this.username);//触发start
	  		this.receive();
	  },
	  methods:{
	  	back(){
	  		var key=this.username+'chat'
	  		var value=this.msgList
	  		if(localStorage.getItem(key)){
	  			localStorage.removeItem(key);
	  		}
	  		localStorage.setItem(key, JSON.stringify(value));
	  		// console.log(JSON.parse(localStorage.getItem(key)));
			window.history.go(-1)
	  // 		caches.open(this.username).then(function(cache) { 
			//  	cache.delete();
			// }).then(function(cache) { 
			//    cache.add(this.msgList);
	  // 			console.log("save",cache);
			// 	window.history.go(-1)
			// });
	  	},
	  	send() {
		  	if(this.msg.length>0){
		  		var info={};
			  	info.user=this.username;
			  	info.msg=this.msg;
			  	// console.log("info",info);
	            this.$socket.emit('chatRoom', info);
	            this.msg='';
		  	}
        },
        receive(value){
        	this.$socket.on('recmsg',value=>{            
        		console.log('val',value);
        		// console.log('1msgList',this.msgList);
        		var recmsg={
        			nm:'',
        			my:'',
	      			ot:'',
	      			tm:''
        		};
        		if(value.user==this.username){
        			recmsg.nm=value.user;
        			recmsg.ot='';
            		recmsg.my=value.msg;
        		}else{
        			recmsg.nm=value.user;
        			recmsg.my='';
            		recmsg.ot=value.msg;
        		}
        		recmsg.tm=value.time;
        		console.log('2msgList',this.msgList);
        		this.msgList.push(recmsg);
            	this.$nextTick(() => {
                    setTimeout(()=>{
	                    this.scroll.refresh();
	                },30)
                })
        	});
        	this.$socket.on('userList',value=>{
        		this.userList=value;
        		console.log('list',this.userList);
        	})
        },
        listUser(){
        	this.listShow=!this.listShow;
        }
	  },
	  sockets:{//不能改
	      connect:function() {//与socket.io连接后回调
	        console.log('socket connected');
	      },
	      login:function(value) {
	        console.log(value);//监听login(后端向前端emit  login的回调)
	      }
	  },
	}
</script>
<style lang="scss" scoped>
$rem:414/6.4rem;
	.chatRoom{
		position:fixed;
		top:0/$rem;
		left:0/$rem;
		min-width:414/$rem;
		width:100%;
		height:(736-64)/$rem;
		background:#fff;
		z-index:10;
		.back{
			width:100%;
			height:64/$rem;
			background:#26a2ff;
			-background:transparent;
			font-size:22px;
			line-height:64px;
			color:#fff;
			text-align:center;
			i{
				float:left;
				margin-right:-(50/$rem);
			}
		}
		.content{
			width:400/$rem;
			height:590/$rem;
			position:relative;
			-height:auto;
			margin:10px auto;
			box-shadow:0 0 2px #aaa;
			overflow:hidden;
			ul{
				position:absolute;
				bottom:0;
				width:360/$rem;
				-left:30/$rem;
				min-height:580/$rem;
				height:auto;
				box-size:border-box;
				padding:50px 10px 20px 10px;
				box-size:border-box;
				li.word{
					width:360/$rem;
					min-height:42/$rem;
					height:auto;
					margin:10px 10px;
					padding:10px 0;
					box-size:border-box;
					font-size:18px;
					line-height:36/$rem;
					-border:1px solid red;
					box-shadow:none;
					div{
						width:100%;
						&.chatW{
							margin-bottom:20px;
						}
						p{
							max-width:90%;
							padding:0px 15px 0px 15px;
							border-radius:9px;
							&.fl{
								color:#fff;
								-text-indent:15px;
								background:#26a2ff;
								float:left;
								margin-right:60/$rem;

							}
							&.fr{
								color:#26a2ff;
								background:#eee;
								float:right;
							}
							&.tm{
								width:90%;
								-width:200/$rem;
								text-align:center;
								margin:0px auto;
								font-size:12px;
								color:#bbb;
								-line-height:36px;
							}
						}
						i{
							-color:#c04;
							font-size:15px;
							line-height:36px;
							font-style: normal;
							&.fl{
								color:#c56;
								float:left;
								margin-right:5px;
							}
							&.fr{
								color:#26a2ff;
								float:right;
								margin-left:8px;
							}
						}
					}
				}
			}
		}
		.input{
			position:fixed;
			bottom:0px;
			width:100%;
			background:#fff;
			box-shadow:0 0 3px #bbb;
			padding:8px 0;
			.mint-cell{
				width:300/$rem;
				float:left;
				-border:1px solid #bbb;
				box-shadow:0 0 2px #bbb inset;
				border-radius:5px;
				margin-left:28/$rem;
			}
			.mint-button{
				float:left;
				vertical-align:text-bottom;
				margin:5px 0 0 5/$rem;
			}
		}
		.background{
			position:fixed;
			top:0;
			width:100%;
			height:100%;
			padding-top:20/$rem;
			background:skyblue;
			filter:blur(5px);
		}
		.list{
			position:fixed;
			top:0;
			-z-index:100;
			width:100%;
			height:100%;
			font-size:24px;
			padding-top:20/$rem;
			ul{
				width:80%;
				height:auto;
				margin:10/$rem auto;
				color:#fff;
				font-size:16px;
				li{
					text-align:center;
				}
			}
		}
	}
</style>