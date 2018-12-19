<template>
  <div class="home">
  	<transition-group name="flip" tag="div" class="flip">
        <!--<transition name="move">-->
          <SideNav :user="user" v-show='navTag' :navtag="navTag" :key="1"></SideNav>
        <!--</transition>-->
          <Header :user="user" @tog="showNav" :key="2"></Header>
<!-- 		<p>{{user.name}}</p>
		<p>{{user.age}}</p>
		<p>{{user.city}}</p> -->
  	</transition-group>
	</div>
</template>
<script type="text/javascript">
	import Header from "../Header/Header.vue"
	import SideNav from "../SideNav/SideNav.vue"
	export default {
	  name: 'home',
	  props:{
	  	user: {
	  		type: Object
	  	}
	  },
	  data () {
	    return {
	      msg: 'Welcome to Qtalk App',
	      navTag:true
	    }
	  },
	  methods:{
	  	showNav(){
	  		this.navTag=!this.navTag
	  	}
	  },
	  components:{
	  	Header,
	  	SideNav
	  }
	}
</script>
<style lang="scss" scoped>
  $rem:414/6.4rem;
	.home{
    .flip{
      display: flex;
      width: 100%;
    }
    .flip-enter, .flip-leave-to{
      transform: translate3d(100/$rem, 0, 0);
      box-shadow: none;
    }
    .flip-leave-active {
      position: absolute;
      transform: translate3d(-100%, 0, 0);
      box-shadow: none;
    }
    flex-direction: row;
		.sideNav{
			display:block;
      transition: all 0.5s linear;

		}
    .head{
      display: block;
      flex: 1;
   }
	}
</style>
