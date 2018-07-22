<template>
  <div id="app">
    <div class="login" v-show="!loginStatus">
      <mt-field label="昵称" placeholder="请输入昵称" v-model="userInfo.name">
      </mt-field>
      <mt-field label="性别" placeholder="请输入性别" type="sex" v-model="userInfo.sex">
      </mt-field>
      <mt-field label="年龄" placeholder="请输入年龄" type="age" v-model="userInfo.age">
      </mt-field>
      <mt-field label="城市" placeholder="请输入城市" type="city" v-model="userInfo.city">
      </mt-field>
    </div>
    <div class="home" v-show="loginStatus">
      <home :user="userInfo"></home>
    </div>
    <!-- <router-view v-show="loginStatus">
    </router-view> -->
  </div>
</template>
<script type="text/ecmascript-6">
    import home from './components/Home/Home.vue';
    export default{
			data(){
				return{
					loginStatus:false,
					userInfo:{
						name:null,
            sex:null,
						age:null,
						city:null
					}
				}
			},
			methods:{
				login(){
					console.log(this.userInfo);
					this.loginStatus = true;
				}
			},
			components:{
				'home': home,

			}
		}
</script>

<style scoped lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .login{
    width:100%;
    height:650px;
    background:#bbb;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-around;
    padding:50px 0;
    .rad{
      border:none;
      background:none;
      font-size:25px;
    }
    .submit{
      background:lightgreen;
      border-radius:5px;
      padding:5px 10px;
      -text-decoration:none;
      color: #fff;
      font-weight:bold;
      cursor:pointer;
    }
  }
}
</style>
