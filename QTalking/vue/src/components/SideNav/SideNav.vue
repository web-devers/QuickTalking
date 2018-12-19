<template>
	<div class="sideNav">
    <transition name="move">
      <div class="user" v-if="navtag" @click="chooseHeader">
        <img src="../../assets/img/3_02.png" v-if="user.sex=='男'">
        <img src="../../assets/img/3_03.png" v-else="user.sex=='女'">
        <div class="info">
          <p>{{user.name}}</p>
          <p>{{user.sex}}</p>
        </div>
      </div>
    </transition>
		<ul>
			<transition-group name="list-nav" >
        <router-link v-for="rt,idx in navlist" :key="idx" :to="rt.to+user.name" tag="li" active-class="active"  :style="{transitionProperty:'all',transitionDuration: (1+0.1*idx)+'s'}" v-if="navtag">
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
    <div class="choseHead" v-if="chooseFlag">
      <div class="bg"></div>
      <div class="header-con">

      </div>
    </div>
	</div>
</template>
<script type="text/javascript">
	export default {
	  props:{
	  	user: {
	  		type: Object
	  	},
      navtag:{
	  	  type: Boolean
      }
	  },
	  // watch:{
   //      $route(to,from){
   //        console.log('路由变化');
   //        console.log(to,from);
   //        // if(to.path=='/'){}
   //        this.$store.dispatch('showheader');
   //      }
   //    },
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
        chooseFlag:true
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
      chooseHeader(){
	  	  this.chooseFlag=!chooseFlag
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
				margin-top:-16/$rem;
				display:inline-block;
				border-radius:50%;
				border: 2px solid #fff;
				font-size: 0.5rem;
				line-height: 0.8rem;
				overflow:hidden;
				box-sizing:border-box;
			}
			.info{
				margin:0.2rem 0.1rem 0 0;
				font-size:0.2rem;
				display:inline-block;
				line-height:0.25rem;
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
					-border-bottom:0.05rem solid #4bafe3;
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
    .choseHead{
      position: relative;
      border: 1px solid red;
    }
	}
</style>
