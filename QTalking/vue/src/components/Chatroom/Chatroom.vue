<template>
	<div class="chatRoom">
		<div class="back">
			<i @click="back">
				<img width="100%" src="../../assets/img/1_05.png"></i>
			<p @click='listUser'>聊天室({{userList.length}}人)</p>
		</div>
		<div class="content" ref="chatWrapper" >
			<ul class="chatList">
				<li class="word" v-for="(item,index) in msgList" >
					<div class="tm">
						<span>{{item.tm}}</span>
					</div>
					<div class="chatW">
            <i class="fl" ><span v-if="item.ot">{{item.nm}}</span></i>
						<div class="fl" v-if="item.ot"><span>{{item.ot}}</span></div>
						<div class="fr" v-if="item.my"><span>{{item.my}}</span></div>
						<i class="fr" ><span v-if="item.my">{{item.nm}}</span></i>
        	</div>
				</li>
			</ul>
		</div>
		<div class="input">

      <input type="text" placeholder="" v-model="msg" class="ip-cell">
      <div class="ip-btn" @click="send">发送</div>
		</div>
		<div class="background" v-show='listShow'></div>
		<div class="list" v-show='listShow'>
      <i class="cls" @click='listUser'></i>
			<ul>
				<li v-for='item in userList'>
					<span style="width: 80px">{{item.name}}</span>
					<span style="width: 80px">{{item.sex}}</span>
					<span style="width: 80px">{{item.age}}</span>
					<span style="width: 80px">{{item.city}}</span>
				</li>
        <div class="sex-chart">
            <pieChart :rosepiedata="sexpiedata"></pieChart>
        </div>
        <div class="city-chart">
            <barChart :barchartdata="citybardata" ></barChart>
        </div>
			</ul>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BSscroll from 'better-scroll'
  import  pieChart from "../listChart/pie-chart"
  import  barChart from "../listChart/bar-chart"
	export default {
	  name: 'home',
	  props:{
	  	user: {
	  		type: Object
	  	}
	  },
    components:{
	    pieChart,
      barChart
    },
	  data () {
	    return {
	      msgList:[],
	      msg:'Welcome to Qtalk App home',
	      listHeight:null,
	      username:null,
	      userList:[],
	      listShow:false,
        sexpiedata:{
	        legendData:[],
	        datas:[],
	        colors:[],
	        format:"{a|{c}Person} \n {b|{b}}"
        },
        citybardata: {
            stime: '',
            etime: '',
            platformNames:[] ,
            colors:[],
            dimensions:[],
            barwidth:'',
            barcount:0,
            bargap:'',
            barsizeY:[10,100],
        },
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
        		// console.log('list',this.userList);
        	})
        },
        listUser(){
        	this.listShow=!this.listShow;
        	this.setSexPieDate();
          this.setCityBarDate();
        },
        setSexPieDate(){
	  	    this.sexpiedata={
        	  legendData:['Male','Female'],
            datas:[{
                name:'Male',
                value:0
              },{
                name:'Female',
                value:0
              }],
            colors:[],
            format:"{a|{c}人} \n {b|{b}}"
          }
        	this.userList.forEach(list=>{
            this.sexpiedata.colors=['#E8AE32','#905AE7']
            if(list.sex=="男"){
              this.sexpiedata.datas[0].value+=1
            }else{
              this.sexpiedata.datas[1].value+=1
            }
          })
        },
        setCityBarDate(){
          this.citybardata={
              stime: '',
              etime: '',
              xbarNames:[] ,
              colors:[],
              dimensions:[],
              barwidth:'',
              barcount:0,
              bargap:'',
              barsizeY:[],
          }
          var dimensions=[],citys=[];
          this.userList.forEach(list=>{
            if(!dimensions.some(it=>{
              if(it.name==list.city){
                it.data+=1
                return true
              }
            })){
              dimensions.push({
                name:list.city,
                data:1
              })
              citys.push(list.city)
            }
          })
          var ymin=0;
          var ymax=0;
          dimensions.forEach(it=>{
            var num=it.data
            if(num>ymax){
              ymax=num
            }
            if(num<ymin){
              ymin=num
            }
          })
          dimensions.forEach(it=>{
            it.data=it.data.toString()
          })
          this.citybardata.stime=this.formatDate(Date.now()-1000*60*60*24*30*6);
          this.citybardata.etime= this.formatDate(Date.now());
          this.citybardata.xbarNames= ['citys'] ,
          this.citybardata.colors = [ '#FD995F','#DBC9A3', '#B8E5E5', '#D4B5E0', '#B7C8E9', '#BBE7B7', '#EEEDC2'," #85D4D7" ,"#FADBA1","#E0BABA"]; //图例颜色,
          this.citybardata.dimensions= dimensions,
          this.citybardata.barwidth= 0.4*360/dimensions.length+'px',
          this.citybardata.barcount= dimensions.length,
          this.citybardata.bargap= '80%',
          this.citybardata.barsizeY= [ymin,ymax];
          console.log(this.citybardata)
        },
        formatDate(time){
          var date=new Date(time)
	  	    var year =date.getFullYear();
	  	    var month=date.getMonth()+1;
	  	    var day=date.getDate()
          return year+"-"+month+"-"+day
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
@mixin ellipse{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
	.chatRoom{
		position:fixed;
		top:0/$rem;
		left:0/$rem;
		width:100%;
		height:100%;
    display: flex;
    flex-direction: column;
		background:#fff;
		z-index:10;
		.back{
			width:100%;
			height:36/$rem;
			background:#26a2ff;
			font-size:16px;
			line-height:36px;
			color:#fff;
			text-align:center;
			i{
        width: 36/$rem;
        height: 36/$rem;
				float:left;
				margin-right:-(50/$rem);
			}
		}
		.content{
			width:100%;
      flex: 1;
      height: 100%;
			position:relative;
			margin:10px auto;
			box-shadow:0 0 2px #aaa;
			overflow:auto;
			ul{
				position:absolute;
				width:100%;
				box-size:border-box;
				box-size:border-box;
        padding:6px 6px;
				.word{
					width:100%;
          height: auto;
					font-size:18px;
					line-height:24/$rem;
					box-shadow:none;
          .tm{
            width:100%;
            text-align:center;
            margin:0px auto;
            font-size:12px;
            color:#bbb;
            span{
               background: #eee;
               height: 15px;
              border-radius: 3px;
              padding: 1px 2px;
            }
          }
					.chatW{
            display: flex;
						div{
              flex: 1;
              margin: 3px 0;
              font-size: 12px;
              line-height: 16px;
							&.fl{
								margin-right:60/$rem;
                text-align: left;
							}
							&.fr{
								color:#bbb;
                text-align: right;
							}
						}
						i{
              width: 70px;
              @include ellipse;
							font-size:13px;
              line-height: 16px;
							font-style: normal;
							&.fl{
								color:#c56;
							}
							&.fr{
								color:#26a2ff;
							}
						}
					}
				}
			}
		}
		.input{
			bottom:0px;
			width:100%;
      height: 30px;
			background:#fff;
			box-shadow:0 0 3px #bbb;
			padding:3px 0;
      display: flex;
      align-items: center;
			.ip-cell{
        flex: 1;
        height: 24px;
				border:1px solid #26a2ff;
				border-radius:5px;
        text-indent: 5px;
        margin: 0 10/$rem;
			}
			.ip-btn{
        width: 60/$rem;
        height: 24px;
        margin: 0 5px;
        background: #26a2ff;
        color:#fff;
        border-radius:5px;
        font-size: 15px;
        line-height: 24/$rem;
			}
		}
		.background{
			position:fixed;
			top:0;
			width:100%;
			height:100%;
			padding-top:20/$rem;
			background:#fff;
			-filter:blur(5px);
		}
		.list{
			position:fixed;
			top:0;
			-z-index:100;
			width:100%;
			height:100%;
			font-size:24px;
			padding-top:30/$rem;
      .cls{
        font-style:normal;
				line-height:36/$rem;
        width:24/$rem;
        height:24/$rem;
        display: block;
        margin: auto;
        background:url('../../assets/img/icon/icon_delete.png') 0 0/cover;
      }
			ul{
				width:100%;
				height:100%;
				margin:30/$rem auto;
				color:#fff;
        overflow: auto;
				font-size:16px;
				li{
					text-align:center;
          display: flex;
          justify-content: space-between;
          line-height: 20px;
          font-size: 18px;
          align-items: center;
          span{
            color: deepskyblue;
          }
				}
        .sex-chart{
          width: 360/$rem;
          height: 220/$rem;
          margin: 20/$rem auto;
        }
        .city-chart{
          width: 360/$rem;
          height: 360/$rem;
          margin: 20/$rem auto;
        }
			}
		}
	}
</style>
