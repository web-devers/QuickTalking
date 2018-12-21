<template>
	<div class="sideNav">
    <transition name="move">
      <div class="user" v-if="navtag" @click="chooseSel">
        <img :src="avator?staticurl+avator:defaultavator" >
        <!--<img src="../../assets/img/3_02.png" v-if="user.sex=='男'">-->
        <!--<img src="../../assets/img/3_03.png" v-else="user.sex=='女'">-->
        <div class="info" :style="{color:user.sex==0?'deepskyblue':'red'}">
          <p>{{user.username}}</p>
          <p>{{user.sex==0?'男':'女'}}</p>
        </div>
      </div>
    </transition>
		<ul>
			<transition-group name="list-nav" >
        <router-link v-for="rt,idx in navlist" :key="idx" :to="rt.to+user.username" tag="li" active-class="active"  :style="{transitionProperty:'all',transitionDuration: (1+0.1*idx)+'s'}" v-if="navtag">
          <a href="javascript:;"><i :class="rt.claz"></i>{{rt.name}}</a>
        </router-link>

        <li @click='clearCookie' :key="navlist.length+1" :style="{transitionDuration: (1.1+0.1*navlist.length)+'s'}" v-if="navtag">
          <a href="javascript:;">
            <i class="back" />退出
          </a>
        </li>
      </transition-group>
		</ul>
		<transition name="move">
			<router-view>
			</router-view>
		</transition>
    <AvatorSel :chooseflg="chooseFlag" :useavator="avator?staticurl+avator:defaultavator" :user="user"></AvatorSel>
	</div>
</template>
<script type="text/javascript">
  import imgboy from '../../assets/img/3_02.png'
  import imggirl from '../../assets/img/3_03.png'
  import AvatorSel from '../AvatorSel/AvatorSel'
  import eventBus from '../../eventBus'
	export default {
	  props:{
	  	user: {
	  		type: Object
	  	},
      navtag:{
	  	  type: Boolean
      }
	  },
    components:{
	    AvatorSel
    },
	  // watch:{
   //      $route(to,from){
   //        console.log('路由变化');
   //        console.log(to,from);
   //        // if(to.path=='/'){}
   //        this.$store.dispatch('showheader');
   //      }
   //    },
    mounted(){
	    console.log(this.user)
      this.avator=this.user.avator
    },
	  data () {
	    return {
	      navlist:[
          {
            to:'/Photo\:',
            claz:'search',
            name:'搜索'
          },{
            to:'/Chatroom:',
            claz:'chat',
            name:'群聊'
          },{
            to:'/Cave:',
            claz:'cave',
            name:'树洞'
          },{
            to:'/Picture:',
            claz:'pic',
            name:'图片'
          },{
            to:'/Star:',
            claz:'star',
            name:'星座'
          },{
            to:'/Dict:',
            claz:'dict',
            name:'性格'
          },{
            to:'/Sstore:',
            claz:'estore',
            name:'商场'
          }
        ],
	      msg: 'Welcome to Qtalk App home',
        chooseFlag:false,
        avator:'',
        defaultavator:this.user.sex=='男'?imgboy:imggirl,
        staticurl:'../../../static/avator/'

	    }
	  },
	  methods:{
	  	clearCookie() {
          this.setCookie("QTalking","",-1);//修改2值都为空，天数为负1天就好了
	      // this.$router.push("/");
	      window.location.href='/';
	      // window.open('/');
	  	},
	  	setCookie(c_name,c_info,exdays) {
          var exdate=new Date();//获取时间
          exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
          //字符串拼接cookie
          window.document.cookie=c_name+ "=" +c_info+";path=/;expires="+exdate.toGMTString();
          // window.document.cookie="userinfo"+"="+c_info+";path=/;expires="+exdate.toGMTString();
      },
      chooseSel(){
	  	  this.chooseFlag=!this.chooseFlag
        eventBus.$on('closesel',function (val) {
          this.chooseFlag=val.sel
          this.avator=val.avator
        }.bind(this))
      }
	  }
	}
</script>
<style lang="scss" scoped>
	$rem:414/6.4rem;
	.sideNav{
		background:#fcfcfc;
    box-shadow:2px 2px 3px #ccc;
		.user{
			width:100/$rem;
      height: 64/$rem;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      &.move-enter-active, &.move-leave-active{
				transition: all 1s linear;
			}
			&.move-enter, &.move-leave-active{
        opacity: 0;
        transform: translate3d(-100%, -100%, 0) scale(3);
			}
			img{
				width: 0.7rem;
				height: 0.7rem;
				border-radius:50%;
				border: 2px solid #fff;
				font-size: 0.5rem;
				overflow:hidden;
				box-sizing:border-box;
			}
			.info{
				font-size:0.2rem;
				line-height:24px;
        color: deepskyblue;
        font-weight: normal;
			}
		}
    ul{
			width:100/$rem;
			-height:9.6rem;
      .list-nav-enter, .list-nav-leave-to{
        opacity: 0;
        transform: translate3d(-100%, -100%, 0) scale(3);
      }
      .list-nav-leave-active {
        transform: translate3d(-100%, -100%, 0) scale(3);
      }
			li{
				width:100%;
				height:1.0rem;
				border-bottom:1px solid #ccc;
				-border-bottom:2px solid #ccc;
				-box-shadow:0 0px 3px #ccc inset;
				&.active{
					height:1.0rem;
					border-left:0.05rem solid #4bafe3;
					text-decoration:none;
					a{
						color:#4bafe3;
					}
				}
				a{
					display:block;
					width:100/$rem;
					height:1.0rem; 
					line-height:1.0rem; 
					text-align:center; 
					font-size:0.27rem; 
					color:#888;
					font-weight:bold;
					font-family:"STXingkai",Georgia,Serif;
					-text-shadow:1px 1px 2px #bbb;
					text-decoration:none;
					i{
						display:inline-block;
						width:22/$rem;
						height:17/$rem;
						margin-right:10px;
						vertical-align:text-top;
						&.search{
							background:url('../../assets/img/1_07.png') 0 2px /cover;
						}
						&.chat{
							background:url('../../assets/img/1_11.png') 0 0/cover;
						}
						&.cave{
							background:url('../../assets/img/1_15.png') 0 -2px /cover;
						}
						&.pic{
							background:url('../../assets/img/1_19.png') 0 0/cover;
						}
						&.dict{
							background:url('../../assets/img/1_22.png') 0 0/cover;
						}
						&.star{
							background:url('../../assets/img/1_12.png') 0 0/cover;
						}
						&.estore{
							background:url('../../assets/img/1_08.png') 0 0/cover;
						}
						&.back{
							background:url('../../assets/img/1_10.png') 0 0/cover;
						}
					}
				}
			}
		}
		.chatRoom{
			&.move-enter-active, &.move-leave-active{
				transition: all 0.2s linear
			}
			&.move-enter, &.move-leave-active{
				transform: translate3d(100%, 0, 0)
			}
		}
	}
</style>
