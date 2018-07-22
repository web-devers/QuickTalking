<template>
	<div class="sideNav">
		<ul>
			<router-link to="/m" tag="li" active-class="active">
				<a href="javascript:;"><i class="search"></i>搜索</a>
			</router-link>
			<router-link :to="'/Chatroom:'+user.name" tag="li" active-class="active">
				<a href="javascript:;"><i class="chat"></i>群聊</a>
			</router-link>
			<router-link to="/b" tag="li" active-class="active">
				<a href="javascript:;"><i class="cave"></i>树洞</a>
			</router-link>
			<router-link to="/Photo" tag="li" active-class="active">
				<a href="javascript:;"><i class="pic"></i>图片</a>
			</router-link>
			<router-link to="/d" tag="li" active-class="active">
				<a href="javascript:;"><i class="dict"></i>性格</a>
			</router-link>
			<router-link to="/s" tag="li" active-class="active">
				<a href="javascript:;"><i class="estore"></i>商场</a>
			</router-link>
			<li>
				<a href="/"><i class="back" />退出</a>
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
	  data () {
	    return {
	      msg: 'Welcome to Qtalk App home'
	    }
	  }
	}
</script>
<style lang="scss">
	$rem:414/6.4rem;
	.sideNav{
		position:fixed;
		left:0;
		top:1rem;
		-border:1px solid blue;
		background:#fcfcfc;
		ul{
			width:100/$rem;
			height:9.6rem;
			li{
				float:top;
				width:100%;
				height:1.2rem;
				-border-bottom:2px solid #ccc;
				box-shadow:0 0px 3px #ccc inset;
				&.active{
					height:1.2rem;
					border-left:0.05rem solid #4bafe3;
					-border-bottom:0.05rem solid #4bafe3;
					text-decoration:none;
					a{
						color:#4bafe3;
					}
				}
				a{
					display:block;
					width:1.2rem;
					height:1.2rem; 
					line-height:1.2rem; 
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
						height:19/$rem;
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
						&.estore{
							background:url('../../assets/img/1_19.png') 0 0/cover;
						}
						&.back{
							background:url('../../assets/img/1_26.png') 0 0/cover;
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