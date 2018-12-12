<template>
	<div class="photo">
		<div class="back">
			<i @click='back'>
				<img src="../../assets/img/1_05.png"></i>
			<p>图片欣赏</p>
		</div>
		<transition name='move'>
			<div class="input" v-show='showInp'>
				<mt-field placeholder="" v-model="keyWord">
				</mt-field>
				<mt-button type="primary" @click="search">搜索</mt-button>
			</div>
		</transition>
		<loading v-show="loading"></loading>
		<transition name='move'>
		<div class="content" ref="photoWrapper" >
			<ul class="imgList">
				<li v-for="(item,index) in imgList">
					<!-- {{substring(item)}} -->
					<img :src=substring(item) width="100%" @click='swip(index)'>
				</li>
			</ul>
		</div>
		</transition>
		<div class="bg" v-show='showSwip' @click='clswip'></div>
		<div class="control" v-show='showSwip'>
			<i class="fl" @click='clswip'>x</i>
			<!-- <a :href="" download=".png"></a> -->
			<i class="fr" @click='download'></i>
		</div>
		<transition >
			<div class="swiper-container" v-show='showSwip' ref='swip'>
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(item,index) in imgList">
						<img :src=substring(item) width="100%" @click='dw(substring(item))'>
					</li>
				</ul>
				<div class="swiper-scrollbar"></div>
			</div>
		</transition>
		<div class="topmenu">
			<p>A</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import Swiper from 'swiper';
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
	    	keyWord:'',
	    	imgList:[],
	    	username:null,
	    	showInp:true,
	    	showSwip:false	
	    }
	  },
	  computed:mapGetters([
        'loading'
      ]),
	  created(){
	  	this.$nextTick(()=>{
            this.scroll = new BSscroll(this.$refs.photoWrapper, {
            	click: true,
            	scrollY: true,
            	pullUpLoad: {
		          threshold: -30 // 当上拉距离超过30px时触发 pullingUp 事件
		        },
		       	// pullDownRefresh: {
		        //   threshold: 30 // 当上拉距离超过30px时触发 pullingUp 事件
		        // }
       		});
       		this.scroll.on('pullingUp', (pos) => {
		         // this.scroll.finishPullDown(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
		    	// console.log('up',pos)
		    });
		    this.scroll.on('pullingDown', (pos) => {
		         // this.scroll.finishPullDown(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
		    	// console.log('down',pos)
		    });
			this.scroll.on('touchEnd', (pos) => {
                	// 下拉动作
                	console.log(pos);
	                if (pos.y < -50) {
	                  // this.loadData()
	                  this.showInp=false
	                  console.log(this.showInp);
	                }
	                if (pos.y > 50) {
	                  // this.loadData()
	                  this.showInp=true
	                }
	            })
        });
	  },
	  mounted(){
	  		var reg=/(\/\w+):([\u4e00-\u9fa5_a-zA-Z0-9]+$)/;
			console.log(this.$route.path);
			console.log(this.$route.path.match(reg));
			this.username=this.$route.path.match(reg)[2];
	  		if(localStorage.getItem(this.username+'pic')){
				this.imgList
				=JSON.parse(localStorage.getItem(this.username+'pic'));
				setTimeout(()=>{
		         this.scroll.refresh();
		         this.initSwip(0);
		     	},1000)
			}

	  },
	  methods:{
	  	back(){
	  		var key=this.username+'pic'
	  		var value=this.imgList
	  		if(localStorage.getItem(key)){
	  			localStorage.removeItem(key);
	  		}
	  		localStorage.setItem(key, JSON.stringify(value));
	  		console.log(JSON.parse(localStorage.getItem(key)));
			window.history.go(-1)
	  	},
	  	search(){
	  		console.log(this.keyWord);
	  		if(this.keyWord.length>0){
		  		var that=this;
		  		// this.$http.get("http://192.168.31.177:808/pic?word="+this.keyWord).then(function(res){
		  		this.$http.get("/qtserver/pic?word="+this.keyWord).then(function(res){
		  			that.imgList=res.data;
		  			// console.log(JSON.parse(that.imgList[0]));
		  			// console.log( eval('(' + that.imgList[0] + ')'));
		  			that.$nextTick(() => {
	                    setTimeout(()=>{
		                    that.scroll.refresh();
		                },3000)
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
	  	},
	  	swip(index){
	  		this.showSwip=true;
	  		// this.initSwip(index);
	  		setTimeout(() => {
		        this.swiper.slideTo(index, 50, false);
		    }, 500);
	  	},
	  	initSwip(n){
	  		console.log(n);
	  		this.swiper=new Swiper('.swiper-container', {
			// this.swiper=new Swiper(this.$refs.swip, {
				// initialSlide :n,
				loop:false,
				// slidesPerView: this.imgList.length,
				autoplay: {
					delay: 1800,
					stopOnLastSlide: false,
					disableOnInteraction: true,
				},
				scrollbar: {
				   el: '.swiper-scrollbar',
				},
				// pagination : '.swiper-pagination', 
				direction : 'horizontal',
				autoHeight: false,
				// effect: 'fade'
			})
			// setTimeout(() => {
			 //   this.swiper.slideTo(7, 50, false);
			 //}, 500);
	  	},
	  	download(){

	  	},
	  	clswip(){
	  		if(this.swiper){
		  		// mySwiper.destroy(deleteInstance, cleanupStyles)
		  		// console.log(this.swiper);
		  		// this.swiper.destroy(false, true)
		  		// console.log(this.swiper);
	  		}
	  		this.showSwip=false;
	  	},
	  	dw(url){
	  		window.open(url)
	  	}
	  },
	}
</script>
<style lang="scss" scoped>
$rem:414/6.4rem;
	.photo{
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
			z-index:11;
			i{
				float:left;
				margin-right:-(50/$rem);
			}
		}
		.input{
			&.move-enter-active, &.move-leave-active{
				transition: all 0.3s linear
			}
			&.move-enter, &.move-leave-active{
				transform-origin: center top;
				transform: translate3d(0,0, 0) scale3d(1,0,1)
			}
			-position:fixed;
			-top:64/$rem;
			-margin-top:64/$rem;
			width:100%;
			height:54/$rem;
			background:#fff;
			box-shadow:0 0 3px #bbb;
			padding:12/$rem 0;
			.mint-cell{
				width:290/$rem;
				float:left;
				-border:1px solid #bbb;
				box-shadow:0 0 2px #bbb inset;
				border-radius:5px;
				margin-left:12/$rem;
			}
			.mint-button{
				float:right;
				vertical-align:text-bottom;
				margin:5px 12/$rem 0 5/$rem;
			}
		}
		.content{
			&.move-enter-active, &.move-leave-active{
				transition: all 0.5s linear
			}
			&.move-enter, &.move-leave-active{
				transform: translate3d(0,100%,0)
			}
			-margin-top:(45*2-30)/$rem;
			-height:600/$rem;
			height:100%;
			width:100%;
			overflow:hidden;
			-flex:1;
			.imgList{
				-width:405/$rem;
				width:98%;
				margin:10/$rem auto;
				height:auto;
				li{
					height:auto;
					margin-bottom:10px;
					box-shadow:0 0 8px #000;
					&:last-child{
						margin-bottom:120/$rem;
					}
				}
			}
		}
		.bg{
			position:fixed;
			top:0;
			width:100%;
			height:100%;
			-padding-top:20/$rem;
			background:#000;
			filter:blur(5px);
		}
		.control{
			position:absolute;
			top:0/$rem;
			width:100%;
			height:36/$rem;
			i{
				width:30/$rem;
				height:30/$rem;
				font-size:30/$rem;
				font-style:normal;
				line-height:36/$rem;
				&.fl{
					float:left;
					margin-left:10/$rem;
				}
				&.fr{
					float:right;
					margin:5/$rem 10/$rem 0 0;
					-background:url('../../assets/img/1_26.png') 0 0/cover;
				}
			}
		}
		.swiper-container{
			position:absolute;
			top:30/$rem;
			width:100%;
			height:auto;
			-height:100%;
			.swiper-wrapper{
				.swiper-slide{
					width:100%;
					box-sizing:border-box;
					-position:absolute;
					width:100%;
					-height:auto;
					margin:auto;
					img{
						width:100%;
						box-shadow:0px 0px 2px #fff;
					}
				}
			}
			.swiper-scrollbar{
				bottom:0/$rem;
				background:#333;
			}
		}
	}
</style>