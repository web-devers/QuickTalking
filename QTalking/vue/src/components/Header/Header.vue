<template>
	<div class="head">
		<div class="navtab" @click="showNav">
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
		</div>
    <div class="log">
      <i class="qtalking"></i>
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
    .log{
      width: 100/$rem;
      height:64/$rem;
      padding: 5/$rem;
      float:right;
      box-sizing: border-box;
      border-bottom:1px solid #ccc;
      .qtalking{
        width: 50/$rem;
        height: 50/$rem;
        margin: auto;
        display: block;
        background:url('../../../static/2_03_03.png') 0 2px /cover;
      }
    }

	}
</style>
