<template>
	<div class="chatRoom">
		<div class="back">
			<i onclick="window.history.go(-1)">
				<img src="../../assets/img/1_05.png"></i>
			<p>聊天室</p>
		</div>
		<div class="content" ref="chatWrapper" >
			<ul class="chatList">
				<li class="word" v-for="(item,index) in msgList" >
					<i class="fr" v-show="item.my">{{item.nm}}</i>
					<p class="fr" v-show="item.my">{{item.my}}</p>
					<i class="fl" v-show="item.ot">{{item.nm}}</i>
					<p class="fl" v-show="item.ot">{{item.ot}}</p>
				</li>
			</ul>
		</div>
		<div class="input">
			<mt-field placeholder="" v-model="msg">
			</mt-field>
			<mt-button type="primary" @click="send">发送</mt-button>
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
	      userList:[]
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
			var reg=/(\/\w+):(\w+)/;
			console.log(this.$route.path);
			// console.log(this.$route.path.match(reg));
			this.username=this.$route.path.match(reg)[2];
			// this.tp=this.$route.path.match(reg)[4];
			// this.$emit('hide','true')
			this.$socket.emit('start',this.username);//触发start
	  		this.receive();
	  },
	  methods:{
	  	back(){
	  	},
	  	send() {
		  	var info={};
		  	info.msg=this.msg;
		  	info.user=this.username;
		  	// console.log("info",info);
            this.$socket.emit('chatRoom', info);
            this.msg='';
        },
        receive(value){
        	this.$socket.on('recmsg',value=>{            
        		console.log('val',value);
        		// console.log('1msgList',this.msgList);
        		var recmsg={
        			nm:'',
        			my:'',
	      			ot:''
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
        		this.msgList.push(recmsg);
        		// console.log('2msgList',this.msgList);
            	this.$nextTick(() => {
                    setTimeout(()=>{
	                    this.scroll.refresh();
	                },50)
                })
        	});
        	this.$socket.on('userList',value=>{
        		this.userList=value;
        		console.log(this.userList);
        	})
        },
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
<style lang="scss">
$rem:414/6.4rem;
	.chatRoom{
		position:fixed;
		top:0/$rem;
		left:0/$rem;
		width:414/$rem;
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
				min-height:580/$rem;
				height:auto;
				padding:5px 10px;
				li.word{
					width:360/$rem;
					-width:auto;
					height:36/$rem;
					margin:5px 10px;
					font-size:18px;
					line-height:36/$rem;
					-border:none;
					box-shadow:none;
					p{
						padding:0 15px;
						border-radius:9px;
						&.fl{
							color:#fff;
							-text-indent:15px;
							background:#26a2ff;
							float:left;

						}
						&.fr{
							color:#26a2ff;
							background:#eee;
							float:right;
						}
					}
					i{
						-color:#c04;
						font-size:15px;
						font-style: normal;
						&.fl{
							color:#c04;
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
				margin-left:10px;
			}
			.mint-button{
				float:left;
				vertical-align:text-bottom;
				margin:5px 0 0 5px;
			}
		}
	}
</style>