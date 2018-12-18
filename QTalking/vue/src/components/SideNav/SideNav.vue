<template>
	<div class="sideNav">
		<ul>
			<router-link :to="'/Photo:'+user.name" tag="li" active-class="active">
				<a href="javascript:;"><i class="search"></i>搜索</a>
			</router-link>
			<router-link :to="'/Chatroom:'+user.name" tag="li" active-class="active">
				<a href="javascript:;"><i class="chat"></i>群聊</a>
			</router-link>
			<router-link :to="'/Cave:'+user.name" tag="li" active-class="active">
				<a href="javascript:;"><i class="cave"></i>树洞</a>
			</router-link>
			<router-link :to="'/Picture:'+user.name" tag="li" active-class="active">
				<a href="javascript:;"><i class="pic"></i>图片</a>
			</router-link>
			<router-link :to="'/Star:'+user.name" tag="li" active-class="active">
				<a href="javascript:;"><i class="star"></i>星座</a>
			</router-link>
			<router-link to="/d" tag="li" active-class="active">
				<a href="javascript:;"><i class="dict"></i>性格</a>
			</router-link>
			<router-link to="/s" tag="li" active-class="active">
				<a href="javascript:;"><i class="estore"></i>商场</a>
			</router-link>
			<li @click='clearCookie'>
				<a href="javascript:;">
					<i class="back" />退出
				</a>
			</li>
		</ul>
		<transition name="move">
			<router-view>
			</router-view>
		</transition>
	</div>
</template>
<script type="text/javascript">
	export default {
	  props:{
	  	user: {
	  		type: Object
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
	      msg: 'Welcome to Qtalk App home'
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
	  }
	}
</script>
<style lang="scss" scoped>
	$rem:414/6.4rem;
	.sideNav{
		position:fixed;
		left:0;
		top:1rem;
		-border:1px solid blue;
		background:#fcfcfc;
		ul{
			width:100/$rem;
			-height:9.6rem;
			box-shadow:2px 2px 3px #ccc;
			li{
				float:top;
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
	}
</style>
