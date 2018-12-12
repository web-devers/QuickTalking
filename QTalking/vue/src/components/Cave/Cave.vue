<template>
	<div class="caves">
		<div class="back">
			<i @click='back'>
				<img src="../../assets/img/1_05.png"></i>
			<p>树洞里的秘密</p>
		</div>
		<loading v-show="loading"></loading>
		<div class="content" ref="caveWrapper" >
			<ul class="caveList">
				<li v-for="item in caveList" :style="{backgroundColor:'rgb('+colradm()+','+colradm()+','+colradm()+')'}">
					<!-- {{substring(item)}} -->
					<!-- <img :src=substring(item) width="100%"> -->
					<div class="caveword" >
						{{jsonps(item).secret}}
					</div>
					<div class="bottom">
						<i class="up"></i>
						<i class="down"></i>
						<i class="share">分享</i>
						<i class="pl">评论</i>
					</div>
				</li>
			</ul>
		</div>
		<div class="input">
			<mt-field placeholder="请说说你的秘密" v-model="caveWord" type="textarea" rows="2">
			</mt-field>
			<mt-button type="primary" @click="pcave" size='small'>把秘密埋进树洞里</mt-button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BSscroll from 'better-scroll'
	import {mapGetters,mapActions} from 'vuex'
	export default {
	  name: 'home',
	  props:{
	  	user: {
	  		type: Object
	  	}
	  },
	  data () {
	    return {
	    	caveWord:'',
	    	caveList:[],
	    	username:null
	    }
	  },
	  computed:mapGetters([
        'loading'
      ]),
	  created(){
	  	this.$nextTick(()=>{
            this.scroll = new BSscroll(this.$refs.caveWrapper, {
            	click: true,
            	scrollY: true,
            	pullUpLoad: {
		          threshold: 30 // 当上拉距离超过30px时触发 pullingUp 事件
		        }
       		});
       		this.scroll.on('pullingDown', () => {
		         this.scroll.refresh();
		         // this.scroll.finishPullDown(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
		      });
        });
	  },
	  mounted(){
	  		var reg=/(\/\w+):([\u4e00-\u9fa5_a-zA-Z0-9]+$)/;
			// console.log(this.$route.path);
			// console.log(this.$route.path.match(reg));
			this.username=this.$route.path.match(reg)[2];
	  		if(localStorage.getItem(this.username+'cave')){
				this.caveList
				=JSON.parse(localStorage.getItem(this.username+'cave'));
			}
			var that=this;
			// this.$http.get('http://192.168.31.177:808/cave'
			this.$http.get('/qtserver/cave'
				).then(function(res){
					console.log(res.data,that.caveList);
					that.caveList=res.data;
					that.$nextTick(() => {
	                    setTimeout(()=>{
		                    that.scroll.refresh();
		                },50)
	                })
				}).catch(function(err){
					console.log('err',err);
				})
	  },
	  methods:{
	  	back(){
	  		var key=this.username+'cave'
	  		var value=this.caveList
	  		if(localStorage.getItem(key)){
	  			localStorage.removeItem(key);
	  		}
	  		localStorage.setItem(key, JSON.stringify(value));
	  		console.log(JSON.parse(localStorage.getItem(key)));
			window.history.go(-1)
	  	},
	  	pcave(){
	  		var data={
	  			user:this.username,
	  			sex:'',
	  			secret:this.caveWord,
	  			up:0,
	  			down:0,
	  			comment:[]
	  		}
	  		var that=this;
	  		this.$http({
	  				// url:'http://192.168.31.177:808/cave',
	  				url:'/qtserver/cave',
	  				method:'post',
		  			data:data,
		  			// headers:{
				   //      'Content-type': 'application/x-www-form-urlencoded'
				   //      'Content-type': 'application/json'
				   //  },
				    transformRequest: [function (data) {
				        let ret = ''
				        for (let it in data) {
				          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				        }
				        return ret
				      }],
				}).then(function(res){
					console.log(res.data);
					that.caveList=res.data;
					that.$nextTick(() => {
	                    setTimeout(()=>{
		                    that.scroll.refresh();
		                },500)
	                })
	                this.caveWord='';
				}).catch(function(err){
					console.log(err);
				})
	  	},
	  	jsonps(str){
	  		return JSON.parse(str);
	  	},
	  	colradm(){
			return Math.random()*255;
	  	}
	  },
	}
</script>
<style lang="scss" scoped>
$rem:414/6.4rem;
$num:0;
@function colorFn(){
	$colrad:rgb(random(255),random(255),random(255));
	@return $colrad;
}
	.caves{
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
		.input{
			position:fixed;
			bottom:0/$rem;
			width:100%;
			background:#fff;
			box-shadow:0 0 3px #bbb;
			padding:8px 0;
			.mint-cell{
				width:360/$rem;
				-height:64/$rem;
				-line-height:30/$rem;
				font-size:24/$rem;
				-float:left;
				-border:1px solid #bbb;
				box-shadow:0 0 2px #bbb inset;
				border-radius:5px;
				-margin-left:28/$rem;
				margin:0 auto;
			}
			.mint-button{
				-float:right;
				-width:360/$rem;
				vertical-align:text-bottom;
				margin:10px auto;
			}
		}
		.content{
			-width:100%;
			position:relative;
			margin-top:10/$rem;
			height:500/$rem;
			overflow:hidden;
			position:relative;
			.caveList{
				position:absolute;
				bottom:0;
				left:18/$rem;
				width:360/$rem;
				margin:10/$rem auto;
				padding-bottom:10/$rem;
				text-align:left;
				height:auto;
				li{
					height:auto;
					font-size:18px;
					margin-bottom:10px;
					padding:10px 10px;
					border-radius:10px;
					-box-shadow:0 0 8px #000;
					-background:orange;
					background-color:#{colorFn()};
					color:#fff;
					.bottom{
						width:100%;
						height:30px;
						margin:10px 0;
						line-height:24px;
						font-size:16px;
						vertical-align:text-bottom;
						i{
							border:1px solid #fff;
							border-radius:3px;
							text-indent:22px;
							padding:2px 5px;
							margin:5px 10px -10px 3px;
							background-color:#fff !important;
							color:#000;
							&.up{
								width:14px;
								height:22px;
								float:left;
								background:url('../../assets/img/thumb6.png') 0 0/contain no-repeat;
							}
							&.down{
								width:14px;
								height:22px;
								float:left;
								background:url('../../assets/img/font-61484.png') 0 0/contain no-repeat;
							}
							&.pl{
								float:right;
								background:url('../../assets/img/comment36.png') 0 0/contain no-repeat;
							}
							&.share{
								float:right;
								background:url('../../assets/img/share10.png') 0 0/contain no-repeat;
							}
							&:hover{
								box-shadow:0 0 2px #fff;
							}
						}
						
					}
				}
			}
		}
	}
</style>