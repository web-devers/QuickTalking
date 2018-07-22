<template>
	<div class="photo">
		<div class="back">
			<i onclick="window.history.go(-1)">
				<img src="../../assets/img/1_05.png"></i>
			<p>图片欣赏</p>
		</div>
		<div class="input">
			<mt-field placeholder="" v-model="keyWord">
			</mt-field>
			<mt-button type="primary" @click="search">搜索</mt-button>
		</div>
		<div class="content" ref="photoWrapper" >
			<ul class="imgList">
				<li v-for="item in imgList">
					<!-- {{substring(item)}} -->
					<img :src=substring(item) width="100%">
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
	    	keyWord:'',
	    	imgList:[]
	    }
	  },
	  created(){
	  	this.$nextTick(()=>{
            this.scroll = new BSscroll(this.$refs.photoWrapper, {
            	click: true,
            	scrollY: true,
            	pullUpLoad: {
		          threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
		        }

       		});
       		this.scroll.on('pullingDown', () => {
		         this.scroll.refresh();
		         // this.scroll.finishPullDown(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
		      });
        });
	  },
	  mounted(){
	  		// this.receive();
	  },
	  methods:{
	  	back(){
	  	},
	  	search(){
	  		console.log(this.keyWord);
	  		if(this.keyWord.length>0){
		  		var that=this;
		  		this.$http.get("http://192.168.31.177:808/pic?word="+this.keyWord).then(function(res){
		  			that.imgList=res.data;
		  			// console.log(JSON.parse(that.imgList[0]));
		  			console.log( eval('(' + that.imgList[0] + ')'));
		  			this.$nextTick(() => {
	                    setTimeout(()=>{
		                    this.scroll.refresh();
		                },500)
	                })
		  		}).catch(function(err){
		  			console.log(err);
		  		})
	  		}else{
	  			
	  		}
	  	},
	  	substring(str){
	  		str=str.substr(9)
	  		// console.log(str)
	  		return str.replace(/\"/g,"");
	  		// string str = "\"hehe nihao !\"";               
			// Console.WriteLine(str.Trim('"'));
			// string strRex = "[^\"]+";//用正则表达式
			// Regex rg = new Regex(strRex);
			// Console.WriteLine(rg.Match(str));
	  	}
	  },
	}
</script>
<style lang="scss">
$rem:414/6.4rem;
	.photo{
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
		.input{
			position:fixed;
			top:64/$rem;
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
				margin-left:24px;
			}
			.mint-button{
				float:left;
				vertical-align:text-bottom;
				margin:5px 0 0 5px;
			}
		}
		.content{
			margin-top:45*2/$rem;
			height:600/$rem;
			overflow:hidden;
			.imgList{
				width:360/$rem;
				margin:0 auto;
				height:auto;
				li{
					height:auto;
					margin-bottom:10px;
					box-shadow:0 0 8px #000;
				}
			}
		}
	}
</style>