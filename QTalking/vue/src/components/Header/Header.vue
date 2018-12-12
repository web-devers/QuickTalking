<template>
	<div class="head">
		<div class="navtab" @click="showNav">
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
		</div>
		<div class="user">
			<div class="info">
				<p>{{user.name}}</p>
				<p>{{user.sex}}</p>
			</div>
			<img src="../../assets/img/3_02.png" v-show="user.sex=='男'">
			<img src="../../assets/img/3_03.png" v-show="user.sex=='女'">
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
	  name: 'home',
	  props:{
	  	user: {
	  		type: Object
	  	}
	  },
	  data () {
	    return {
	      msg: 'Welcome to Qtalk App home',
	      navShow: true,
	    }
	  },
	  mounted(){
	  	console.log(this.user.sex);
	  	// this.girl=(this.user.sex=='男'?"false":"true");
	  	// this.user.img=`../../assets/img/3_0${sex}.png`;
	  },
	  methods: {
	    showNav() {
	        this.$emit('tog', !(this.navShow));
	    	// console.log()
	  	}
	  }
	}
</script>
<style lang="scss" scoped>
$rem:414/6.4rem;
	.head{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		height:64/$rem;
		background: #26a2ff;
		z-index:0;
		.navtab{
			width: 0.8rem;
			height: 0.6rem;
			-border:1px solid #fff;
			float:left;
			margin:0.2rem 0 0 0.3rem;
			display:flex;
			flex-direction:column;
			justify-content:space-around;
			.line{
				width:0.5rem;
				height:0.08rem;
				border:none;
				background:#fff;
			}
		}
		.user{
			width:2.4rem;
			float:right;
			margin:0.05rem -0.2rem 0 0;
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
				color:#fff;
				line-height:0.25rem;
			}
		}
	}
</style>