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
				// login(){
				// 	console.log(this.userInfo);
        //   var that=this;
        //   this.setCookie('QTalking',JSON.stringify(this.userInfo),3)
        //   // this.userInfo.img=`../../assets/img/3_0${sex}.png`;
        //   this.$http({
        //       url:'/qtserver/login',
        //       method:'POST',
        //       data:that.userInfo,
        //       transformRequest: [function (data) {
        //         let ret = ''
        //         for (let it in data) {
        //           ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        //         }
        //         return ret
        //       }],
        //   }).then(function(res){
        //       that.loginStatus = res.data.loginStatus;
        //       console.log('emit',that.userInfo);
        //       that.userInfo=res.data.userInfo
        //       that.$socket.emit('start',that.userInfo);//触发start
        //   }).catch(function(err){
        //       console.log('err',err);
        //   })
        //   //设置cookie
  			// },
        // setCookie(c_name,c_info,exdays) {
        //     var exdate=new Date();//获取时间
        //     exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //     //字符串拼接cookie
        //     window.document.cookie=c_name+ "=" +c_info+";path=/;expires="+exdate.toGMTString();
        //     // window.document.cookie="userinfo"+"="+c_info+";path=/;expires="+exdate.toGMTString();
        // },
        //   //读取cookie
        // getCookie:function () {
        //   if (document.cookie.length>0) {
        //     console.log('cook',document.cookie);
        //     var arr=document.cookie.split(';');
        //     console.log('arr',arr);
        //     //这里显示的格式需要切割一下自己可输出看下
        //     for(var i=0;i<arr.length;i++){
        //       var arr2=arr[i].split('=');//再次切割
        //       //判断查找相对应的值
        //       if(arr2[0]=='QTalking'){
        //         console.log(arr2[1]);
        //         this.userInfo=JSON.parse(arr2[1]);//保存到保存数据的地方
        //         if(this.submit){
        //           // this.loginStatus = true;
        //           this.login();
        //         }
        //       // }else if(arr2[0]=='userPwd'){
        //       //   this.ruleForm.password=arr2[1];
        //       }
        //     }
        //   }
        // },
        // //清除cookie
        // clearCookie:function () {
        //   this.setCookie("QTalking","",-1);//修改2值都为空，天数为负1天就好了
        // }
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
