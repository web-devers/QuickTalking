<template>
	<div class="home">
		<Header :user="user" @tog="showNav"></Header>
		<transition name="move">
			<SideNav :user="user" v-show='navTag'></SideNav>
		</transition>
		home
		{{msg}}
<!-- 		<p>{{user.name}}</p>
		<p>{{user.age}}</p>
		<p>{{user.city}}</p> -->
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
	.home{
		padding-top: 0.5rem;
		.sideNav{
			display:block;
			&.move-enter-active, &.move-leave-active{
				transition: all 0.4s linear;
			}
			&.move-enter, &.move-leave-active{
				transform: translate3d(-100%, 0, 0);
			}
		}
		
	}
</style>
