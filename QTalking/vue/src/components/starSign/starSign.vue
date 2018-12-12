<template>
	<div class="starSign" @click='hideStarAll'>
		<!-- <div class="back">
			<i @click='back'>
				<img src="../../assets/img/1_05.png"></i>
			<p>星座信息</p>
		</div> -->
		<i @click='back'>
				<img src="../../assets/img/1_05.png"></i>
		<mt-navbar v-model="selected">
		  <mt-tab-item id="1">
		  <mt-button size="small" plain>星座查询</mt-button>
		</mt-tab-item>
		  <mt-tab-item id="2">
		  <mt-button size="small" plain>星座配对</mt-button>
		  </mt-tab-item>
		</mt-navbar>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
		  <mt-tab-container-item id="1">
		    <div class="input1">
				<mt-field placeholder="请输入星座" v-model="starWord" type="text" size="small">
				</mt-field>
				<mt-button type="primary" @click="search" size="small">查询</mt-button>
			</div>
			<loading v-show="loading"></loading>
				<div class="content1" ref="starWrapper1">
				<div class="wrap">
					<ul class="starList" v-show="!starDetail1">
						<li v-for="item in starList" @click='jump(item.star)'>
							<!-- {{substring(item)}} -->
							<!-- <img :src=substring(item) width="100%"> -->
							<div class="star">
								<!-- <img :src="'./'+jsonps(item).zh+'.png'"> -->
								<img :src="item.img1" width="42%">
								<!-- {{jsonps(item).secret}} -->
								<span>{{item.star}}</span>
								<span>{{item.date}}</span>
							</div>
						</li>
					</ul>
					<div class="starDetail" v-show="starDetail1">
						<!-- {{starDtl}} -->
						<img :src="starDtl.img3" width="50%">
						<h3>{{starDtl.star}}({{starDtl.eng}})</h3>
						<p class="date">{{starDtl.date}}</p>
						<span class="prop">{{starDtl.property}}</span>
						<span class="num">幸运数字:{{starDtl.luckynum}}</span>
						<hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
						<p class="style">{{starDtl.style}}</p>
						<p class="parter">最佳配对:{{starDtl.parter}}</p>
						<!-- div. -->
					</div>
				</div>
				</div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="2">
		    <div class="input2" >
		  		<p>十二星座配对爱情缘分和配对指数，提前知晓！</p>
				<span>男生</span>
				<input :placeholder="selList[0]" v-model="starSelect.boy" @click.stop='showStarSel1'></input>
				<Select :list='selList' @choose="chooseItem1" v-show='starSel1'></Select>
				<span>女生</span>
				<input :placeholder="selList[0]" v-model="starSelect.girl" @click.stop='showStarSel2'></input>
				<Select :list='selList' @choose="chooseItem2" v-show='starSel2' class='sel2'></Select>
				<mt-button type="primary" @click="compile" size="small">配对</mt-button>
			</div>
			<loading v-show="loading"></loading>
			<div class="content2" ref="starWrapper2" >
				<!-- {{starPair}} -->
				<div class="wrapper" v-show="starDetail2">
					<div class="shead">
						测算结果：{{starPair.boy}}男配{{starPair.girl}}女
					</div>
					<p><span>配对指数：</span>{{starPair.comfinger}}</p>
					<p><span>配对比重：</span>{{starPair.weight}}</p>
					<p><span>两情相悦指数：</span>{{starPair.lovefinger}}</p>
					<p><span>天长地久指数：</span>{{starPair.longfinger}}</p>
					<p><span>结果评述：</span>{{starPair.outside}}</p>
					<hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
					<p><span class="advice">恋爱建议：</span>{{starPair.advice}}</p>
					<hr style="height:1px;border:none;border-top:1px dashed #0066CC;" />
					<p><span class="attention">注意事项：</span>{{starPair.attention}}</p>
				</div>
			</div>
		  </mt-tab-container-item>
		</mt-tab-container>
		
	</div>
</template>
<script type="text/javascript" scoped>
	import BSscroll from 'better-scroll'
	import Select from '../Select/Select.vue'
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
	    	starWord:'',
	    	starSelect:{
	    		boy:'双子座(5.21-6.21)',
	    		girl:'天秤座(9.23-10.23)'
	    	},
	    	starList:[],
	    	starDtl:{},
	    	username:null,
	    	selected:'1',
	    	selList:[
	    		'白羊座(3.21-4.19)',
				'金牛座(4.20-5.20)',
				'双子座(5.21-6.21)',
				'巨蟹座(6.22-7.22)',
				'狮子座(7.23-8.22)',
				'处女座(8.23-9.22)',
				'天秤座(9.23-10.23)',
				'天蝎座(10.24-11.22)',
				'射手座(11.23-12.21)',
				'魔羯座(12.22-1.19)',
				'水瓶座(1.20-2.18)',
				'双鱼座(2.19-3.20)'
	    	],
	    	starPair:{}
	    }
	  },
	  computed:mapGetters([
        'loading',
        'starDetail1',
        'starDetail2',
        'starSel1',
        'starSel2'
      ]),
      components:{
		Select
	  },
	  created(){
	  	var reg=/(\/\w+):([\u4e00-\u9fa5_a-zA-Z0-9]+$)/;
			// console.log(this.$route.path);
			// console.log(this.$route.path.match(reg));
			this.username=this.$route.path.match(reg)[2];
	  		if(localStorage.getItem(this.username+'star')){
				this.caveList
				=JSON.parse(localStorage.getItem(this.username+'star'));
			}
			var that=this;
			// var url='http://192.168.31.177:808'
			var url='/qtserver'
			this.$http.get(url+'/star'
				).then(function(res){
		  			console.log('sess',res);
					console.log(res.data,that.starList);
					// that.starList=res.data;
					[...res.data].forEach(item=>{
						item=that.jsonps(item);
						console.log(item);
						item.img=url+'/img/'+item.zh+'.png';
						item.img1=url+'/img/'+item.zh+'1.png';
						item.img2=url+'/img/'+item.zh+'2.png';
						item.img3=url+'/img/'+item.zh+'3.png';
						that.starList.push(item);
					});
					that.$nextTick(() => {
	                    setTimeout(()=>{
		                    that.scroll1.refresh();
		                },50)
	                })
				}).catch(function(err){
					console.log('err',err);
				})
		  	this.$nextTick(()=>{
	            this.scroll1 = new BSscroll(this.$refs.starWrapper1, {
	            	click: true,
	            	scrollY: true,
	            	pullUpLoad: {
			          threshold: 30 // 当上拉距离超过30px时触发 pullingUp 事件
			        }
				});
	       		this.scroll1.on('pullingDown', () => {
			         this.scroll.refresh();
			         // this.scroll.finishPullDown(); // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则下拉事件只会执行一次
		       });
       		   this.scroll2 = new BSscroll(this.$refs.starWrapper2, {
            	click: true,
            	scrollY: true,
            	pullUpLoad: {
		          threshold: 30 // 当上拉距离超过30px时触发 pullingUp 事件
		        }
			  });
        });
	  },
	  mounted(){
	  		
	  },
	  methods:{
	  	back(){
	  		var key=this.username+'star'
	  		var value=this.starList
	  		if(localStorage.getItem(key)){
	  			localStorage.removeItem(key);
	  		}
	  		localStorage.setItem(key, JSON.stringify(value));
	  		console.log(JSON.parse(localStorage.getItem(key)));
			window.history.go(-1);
			this.hideDtlAll()
	  	},
	  	compile(){
	  		var data={
	  			boy:this.starSelect.boy.substring(0,3),
	  			girl:this.starSelect.girl.substring(0,3)
	  		}
	  		console.log(data);
	  		var that=this;
	  		this.$http({
	  			// url:'http://192.168.31.177:808/star',
	  			url:'/qtserver/star',
	  				method:'post',
		  			data:data,
		  			transformRequest: [function (data) {
				        let ret = ''
				        for (let it in data) {
				          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				        }
				        return ret
				    }],
	  		}).then(function(res){
				console.log(res.data);
				that.starPair=res.data;
				that.$nextTick(() => {
                    setTimeout(()=>{
	                    that.scroll2.refresh();
	                },600)
                })
                that.showStarDtl2();
			}).catch(function(err){
				console.log(err);
			})
	  	},
	  	search(){
	  		var searchFlag=false;
	  		[...this.starList].forEach(item=>{
	  			if(item.star==this.starWord){
	  				this.starDtl=item;
	  				console.log(item);
	  				this.showStarDtl1();
	  				searchFlag=true;
	  			}
	  		})
	  		if(!searchFlag){
	  			this.hideStarDtl1();
	  		}
	  		// this.$nextTick(() => {
                // setTimeout(()=>{
                 //    this.scroll.refresh();
                	// console.log(this.scroll);

                // },500)
            // })
	  	},
	  	jump(idx){
	  		this.starWord=idx;
	  		this.search();
	  	},
	  	jsonps(str){
	  		return JSON.parse(str);
	  	},
	  	chooseItem1(val){
	  		console.log('1',val)
	  		this.starSelect.boy=val;
	  		setTimeout(()=>{
	  			this.hideStarSel1()
	  		},500);
	  	},
	  	chooseItem2(val){
	  		console.log('2',val)
	  		this.starSelect.girl=val;
	  		setTimeout(()=>{
	  			this.hideStarSel2()
	  		},500);
	  	},
	  	hideStarAll(){
	  		this.hideStarSel1();
	  		this.hideStarSel2();
	  	},
	  	hideDtlAll(){
	  		this.hideStarDtl1();
	  		this.hideStarDtl2();
	  	},
		...mapActions([
            'showStarDtl1',
            'hideStarDtl1',
            'showStarDtl2',
            'hideStarDtl2',
            'showStarSel1',
            'hideStarSel1',
            'showStarSel2',
            'hideStarSel2'
		])
	  }
	}
</script>
<style lang="scss">
$rem:414/6.4rem;
	.starSign{
		position:fixed;
		top:0/$rem;
		left:0/$rem;
		min-width:414/$rem;
		width:100%;
		height:100%;
		-height:(736-64)/$rem;
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
		i{
			-float:left;
			position:fixed;
			top:4px;
			left:6px;
			margin-right:-(50/$rem);
			margin-top:(8/$rem);
		}
		.mint-navbar{
			width:100%;
			padding:0 16/$rem;
			background:#26a2ff;
			.mint-button{
				border:1px solid #fff;
				color:#fff;
			}
		}
		.input1{
			width:100%;
			background:#fff;
			box-shadow:0 0 3px #bbb;
			padding:8px 0;
			.mint-cell{
				width:200/$rem;
				-height:30/$rem;
				-line-height:30/$rem;
				font-size:10/$rem;
				float:left;
				-border:1px solid #bbb;
				box-shadow:0 0 2px #bbb inset;
				border-radius:5px;
				margin-left:45/$rem;
			}
			.mint-button{
				-float:right;
				-width:360/$rem;
				vertical-align:text-bottom;
				margin:10px auto;
			}
		}
		.input2{
			width:100%;
			height:64/$rem;
			background:#fff;
			box-shadow:0 0 3px #bbb;
			padding:8px 0;
			position:relative;
			span{
				float:left;
				line-height:32/$rem;
				margin:10px 6px 0 10px;
				font-size:16px;
				color:#33a4d8;
			}
			input{
				width:100/$rem;
				height:32/$rem;
				padding:0px 5px;
				float:left;
				font-size:12px;
				-border:1px solid #bbb;
				box-shadow:0 0 2px #bbb inset;
				border-radius:5px;
				border:none;
				margin:10px 0 0 0px;
			}
			.select{
				position:absolute;
				left:52/$rem;
				top:68/$rem;
				&.sel2{
					left:208/$rem;
				}
			}
			.mint-button{
				-float:right;
				-width:360/$rem;
				vertical-align:text-bottom;
				margin:10/$rem auto;
			}
		}
		.content1{
			-width:100%;
			margin-top:0/$rem;
			-height:600/$rem;
			-flex:0 1 auto;
			min-height:419/$rem;
			height:600/$rem;
			box-sizing:border-box;
			overflow:hidden;
			.starList{
				display:flex;
				flex-direction:row;
				flex-wrap: wrap;
				align-content: flex-start;
				justify-content:space-around;
				-position:absolute;
				-bottom:0;
				left:18/$rem;
				padding-top:30/$rem;
				width:360/$rem;
				margin:10px auto;
				-height:800/$rem;
				li{
					width:33%;
					height:auto;
					font-size:11px;
					margin-bottom:10px;
					padding:10px 0px;
					border-radius:10px;
					box-sizing: border-box;
					box-shadow:none;
					-box-shadow:0 0 8px #000;
					-background:orange;
					border:none;
					color:#fff;
					.star{
						width:100%;
						padding:0;
						img{
							float:left;
						}
						span{
							width:58%;
							float:right;
							text-align:center;
							color:#000;
							line-height:24/$rem;
						}
					}
				}
			}
			.starDetail{
				padding:20/$rem;
				font-size:18/$rem;
				height:700/$rem;
				line-height:28/$rem;
				h3{
					color:#419dd4;
				}
				.date{
					width:100/$rem;
					margin:5px auto;
					padding:2px 3px;
					background:#f3b1c8;
					color:#fff;
					border-radius:5px;
				}
				.prop{
					background:#f08080;
					color:#fff;
					border-radius:50%;
					padding:3px 5px;
				}
				.style{
					text-indent:24px;
					text-align:left;
				}
				.parter{
					font-weight:bold;
					line-height:30/$rem;
					margin-top:15/$rem;
				}
			}
		}
		.content2{
			min-height:423/$rem;
			height:600/$rem;
			padding:20px 10px;
			background:url('http://192.168.31.177:808/img/bg-1_03.png') center -80px /cover;
			overflow:hidden;
			.wrapper{
				width:100%;
				min-height:650/$rem;
				height:auto;
				margin:40px auto;
				padding-bottom:240/$rem;
				border-radius:20px;
				box-sizing:border-box;
				background:#fff;
				border:10px solid #0b7ae0;
				.shead{
					width:100%;
					height:auto;
					text-align:left;
					text-indent:18px;
					font-size:16px;
					line-height:32px;
					color:#fff;
					background:#77c8fb;
				}
				p{
					text-align:left;
					-text-indent:20px;
					font-size:16px;
					line-height:36px;
					font-weight:bold;
					padding:0 20px;
					.advice{
						color:#4ab3cc;
					}
					.attention{
						color:#2180bc;
					}
				}
			}
		}
	}
</style>