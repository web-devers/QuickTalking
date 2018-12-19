<template>
	<div class="photo">
		<div class="back">
			<i @click='back'>
				<img width="100%" src="../../assets/img/1_05.png"></i>
			<p>图片欣赏</p>
		</div>
		<transition name='move'>
			<div class="input" v-show='showInp'>
        <input type="text" class="ip-cell" placeholder="请输入要搜索的关键" v-model="keyWord">
				<mt-button type="primary" @click="search">搜索</mt-button>
			</div>
		</transition>
		<loading v-show="loading"></loading>
		<transition name='move'>
		<div class="content" ref="photoWrapper" v-show='!showSwip'>
			<ul class="imgList">
				<li v-for="(item,index) in imgList">
					<!-- {{substring(item)}} -->
					<img :src="substring(item)" width="100%" @click='swip(index)'>
				</li>
			</ul>
		</div>
		</transition>
    <keep-alive>
      <MySwiper :imgs="SwipList" :idx="swipidx" v-if="showSwip"></MySwiper>
    </keep-alive>
		<div class="topmenu" v-if="topMenu&&!showSwip" @click="ScrollTop()">
		  <p>A</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import BSscroll from 'better-scroll'
  import MySwiper from '../MySwiper/MySwiper'
  import eventBus from '../../eventBus'
	import {mapGetters,mapActions} from 'vuex'
	export default {
	  name: 'home',
	  props:{
	  	user: {
	  		type: Object
	  	}
	  },
    components:{
	    MySwiper
    },
	  data () {
	    return {
	    	keyWord:'',
	    	imgList:[],
	    	username:null,
	    	showInp:true,
	    	showSwip:false,
	    	topMenu:false,
        SwipList:[],
        swipidx:0
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
            if (pos.y < -50) {
              // this.loadData()
              this.showInp=false
              this.topMenu=true
            }
            if (pos.y > 50) {
              // this.loadData()
              this.showInp=true
              this.topMenu=false
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
	  	  this.swipidx=index
	  		this.showSwip=true;
	  		this.imgList.forEach(img=>{
	  		  this.SwipList.push(this.substring(img))
        })
        eventBus.$on("swiperclose",function (flag) {
          this.showSwip=flag.showSwip
        }.bind(this))
	  	},

	  	ScrollTop(){
        this.scroll.scrollTo(0, 0, 500)
        this.topMenu=false;
	  	},
      substring(str){
	      str=str.substr(9)
	  		return str.replace(/\"/g,"");
      }
	  },
    filters:{

    }
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
		height:100%;
		background:#fff;
		z-index:10;
		.back{
			width:100%;
			height:36/$rem;
			background:#26a2ff;
			-background:transparent;
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
		.input{
			&.move-enter-active, &.move-leave-active{
				transition: all 0.3s linear
			}
			&.move-enter, &.move-leave-active{
				transform-origin: center top;
				transform: translate3d(0,0, 0) scale3d(1,0,1)
			}
			width:100%;
			height:36/$rem;
			background:#fff;
			box-shadow:0 0 3px #bbb;
			padding:6/$rem 0;
      display: flex;
			.ip-cell{
        flex: 1;
        height: 28/$rem;
        border: 1px solid deepskyblue;
				-box-shadow:0 0 2px #bbb inset;
				border-radius:5px;
				margin-left:12/$rem;
        text-indent: 8px;
			}
			.mint-button{
        font-size: 16px;
        width: 63/$rem;
        height: 28/$rem;
				margin:2px 12/$rem ;
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
		.topmenu{
		  position:fixed;
		  bottom:36px;
		  right:30px;
		  width:36px;
		  height:36px;
		  line-height:36px;
		  border-radius:50%;
		  background:#fff;
      color:skyblue;
		  font-size:24px;
		  box-shadow: 0 2px 24px rgba(0,0,0,0.10);
		  -background:url('../../assets/img/icon_back_top_h.png') no-repeat 0 0 /cover;
		}
	}
</style>
