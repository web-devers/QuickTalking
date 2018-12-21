<template>
  <div id="app">
    <!-- <mt-header fixed title="QTalking"></mt-header> -->
    <div v-if="!loginStatus">
      <div class="head" >QTalking</div>
      <div class="login">
        <Login></Login>
      </div>
       <div class="bottom"></div>
    </div>
    <div class="home" v-else>
      <home :user="userInfo"></home>
    </div>
    <!-- <router-view v-show="loginStatus">
    </router-view> -->
  </div>
</template>
<script type="text/ecmascript-6">
    import home from './components/Home/Home';
    import Login from './components/Login/Login'
    // import {mapGetters,mapActions} from 'vuex'
    import eventBus from '../src/eventBus'
    export default{
			data(){
				return{
					loginStatus:false,
          select:false,
					userInfo:{}
				}
			},
      components:{
				 home,Login
			},
      mounted(){
        // this.getCookie()
        eventBus.$on('login',function (val) {
          console.log(val)
          this.loginStatus=val.login
          this.userInfo=val.user[0]
        }.bind(this))
      },
      computed:{
        submit(){
          var inp=0;
          for(var key in this.userInfo){
            //item.length==0
            // if(item==null||item==undefined||item==''){
              if(this.userInfo[key].length>0){
                inp++;
              }
          }
          return Object.keys(this.userInfo).length==inp?true:false
        }
      },
			methods:{
			},

		}
</script>

<style lang="scss" scoped>
$rem:414/6.4rem;
#app {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #969096;
  .head{
    width:100%;
    height:100/$rem;
    background:#26a2ff;
    font-size:0.7rem;
    line-height:1.6rem;
    color:#fff;
  }
  .login{
    width:100%;
    height: auto;
    flex: 1;
    background:#fff;
  }
  .bottom{
      position: absolute;
      bottom: 0;
      width:100%;
      height:30/$rem;
      background:#26a2ff;
    }
}
</style>
