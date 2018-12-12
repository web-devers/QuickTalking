<template>
  <div id="app">
    <!-- <mt-header fixed title="QTalking"></mt-header> -->
    <div class="head" v-show="!loginStatus">QTalking</div>
    <div class="login" v-show="!loginStatus">
      <div class="nickname ">
        <input type="text" name="nickname" placeholder="昵称" class="rad"
        v-model="userInfo.name">
      </div>
      <div class="sex">
         <input type="text" name="sex" placeholder="性别" class="rad" 
        :value="userInfo.sex" @click="select=!select" @blur.prevent="select=false">
        <ul class="list" v-show="select" > 
          <li @click="userInfo.sex='男'">男</li>
          <li @click="userInfo.sex='女'">女</li>
        </ul>
      </div>
      <div class="age">
        <input type="text" name="age" placeholder="Age" class="rad" 
        v-model=" userInfo.age" >
      </div>
      <div class="city">
        <input type="text" name="city" placeholder="城市" class="rad" 
        v-model="userInfo.city" >
      </div>
      <button class="submit rad" @click='login' :disabled="!submit" :class="{'able':submit}">
        进入聊天
      </button>
      <div class="bottom"></div>
       <!-- <router-link to="/Home" class="btn"  @click='login'>进入聊天</router-link> -->
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
    // import {mapGetters,mapActions} from 'vuex'

    export default{
			data(){
				return{
					loginStatus:false,
          select:false,
					userInfo:{
						name:'',
            sex:'',
						age:'',
						city:''
					}
				}
			},
      mounted(){
        this.getCookie()
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
				login(){
					console.log(this.userInfo);
          var that=this;
          this.setCookie('QTalking',JSON.stringify(this.userInfo),3)
          // var sex=this.userInfo.sex=='男'?"2":"3";
          // this.userInfo.img=`../../assets/img/3_0${sex}.png`;
          this.$http({
              url:'/qtserver/login',
              method:'post',
              data:that.userInfo,
              transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
          }).then(function(res){
              console.log(res.data);
              that.loginStatus = res.data.loginStatus;
              console.log('emit',that.userInfo);
              that.$socket.emit('start',that.userInfo);//触发start
          }).catch(function(err){
              console.log('err',err);
          })
          //设置cookie          
  			},
        setCookie(c_name,c_info,exdays) {
            var exdate=new Date();//获取时间
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            //字符串拼接cookie
            window.document.cookie=c_name+ "=" +c_info+";path=/;expires="+exdate.toGMTString();
            // window.document.cookie="userinfo"+"="+c_info+";path=/;expires="+exdate.toGMTString();
        },
          //读取cookie
        getCookie:function () {
          if (document.cookie.length>0) {
            console.log('cook',document.cookie);
            var arr=document.cookie.split(';');
            console.log('arr',arr);
            //这里显示的格式需要切割一下自己可输出看下
            for(var i=0;i<arr.length;i++){
              var arr2=arr[i].split('=');//再次切割
              //判断查找相对应的值
              if(arr2[0]=='QTalking'){
                console.log(arr2[1]);
                this.userInfo=JSON.parse(arr2[1]);//保存到保存数据的地方
                if(this.submit){
                  // this.loginStatus = true;
                  this.login();
                }
              // }else if(arr2[0]=='userPwd'){
              //   this.ruleForm.password=arr2[1];
              }
            }
          }
        },
        //清除cookie
        clearCookie:function () {
          this.setCookie("QTalking","",-1);//修改2值都为空，天数为负1天就好了
        }
			},
			components:{
				'home': home
			}
		}
</script>

<style lang="scss" scoped>
$rem:414/6.4rem;
#app {
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
    height:(736-100-200)/$rem;
    margin-top:30/$rem;
    background:#fff;
    display:flex;
    flex-direction:column;
    align-items: center;
    justify-content: space-around;
    -padding:10/$rem 0;
    .rad{
      border:none;
      background:none;
      font-size:25px;
    }
    .nickname{
      -width:60px;
      input{
        width:120px;
        text-align:center;
        padding:3px 10px;
        background:#f0f0f0;
      }
    }
    .sex{
      -width:60px;
      input{
        width:80px;
        border-radius:5px;
        padding:3px 10px;
        text-align:center;
        background:#f0f0f0;
      }
      .list{
        font-size:18px;
        margin-bottom:-36px;
        li{
          border-radius:4px;
          &:hover{
            background:#bbb;
          }
        }
      }
    }
    .age{
      -width:60px;
      input{
        width:80px;
        border-radius:5px;
        text-align:center;
        padding:3px 10px;
        background:#f0f0f0;
      }
    }
    .city{
      -width:60px;
      input{
        width:80px;
        border-radius:5px;
        text-align:center;
        padding:3px 10px;
        background:#f0f0f0;
      }
    }
    .submit{
      background:#bbb;
      border-radius:5px;
      padding:7px 12px;
      -text-decoration:none;
      color: #fff;
      font-weight:bold;
      cursor:pointer;
      &.able{
        background:#26a2ff;
      }
    }
    .bottom{
      position:fixed;
      bottom:0;
      width:100%;
      height:50/$rem;
      background:#26a2ff;
    }
  }
}
</style>
