<template>
  <div class="loginPage">
    <transition-group name="move" class="move">
      <div class="login" v-if="registStatus" :key="'log'">
        <div class="username">
          <span>用户名:</span>
          <input type="text" v-model="userInfo.name">
        </div>
        <div class="password">
          <span>密码:</span>
          <input type="password" v-model="userInfo.pwd">
        </div>
        <div class="checkbox">
          <input type="checkbox" v-model="pwdcheck"><span>记住密码</span>
          <input type="checkbox" v-model="testcheck" @click="setTest"><span>登陆体验帐号</span>
        </div>
        <div class="confirm">
          <span class="switch" @click="registStatus=!registStatus">注册</span>
          <span class="ok" @click="enter">确认</span>
        </div>
      </div>
      <div class="regist" v-else :key="'reg'">
        <div class="nickname ">
          <input type="text" name="nickname" placeholder="昵称" class="rad"
          v-model="userInfo.name">
        </div>
        <div class="pwd">
          <input type="password" name="password" placeholder="密码" class="rad"
          v-model="userInfo.pwd">
        </div>
        <div class="sex">
           <input type="text" name="sex" placeholder="性别" class="rad"
          :value="userInfo.sex==0?'男':'女'" @click="selectsex=!selectsex" @blur.prevent="selectsex=false">
          <ul class="list" v-show="selectsex" >
            <li v-for="sx in [0,1]" @click="userInfo.sex=sx">{{sx==0?'男':'女'}}</li>
          </ul>
        </div>
        <div class="age">
          <input type="text" name="age" placeholder="Age" class="rad"
          v-model=" userInfo.age" @click="selectage=!selectage" @blur.prevent="selectage=false">
          <ul class="list" v-show="selectage" >
            <li v-for="age in agelist" @click="userInfo.age=age">{{age}}</li>
          </ul>
        </div>
        <div class="city">
          <input type="text" name="city" placeholder="城市" class="rad"
          v-model="userInfo.city" @click="selectprovice=!selectprovice" >
          <ul class="list" v-if="selectprovice" >
            <li v-for="provice in cities" @click="selectcity=true;providx=provice.name">
              <p>{{provice.name}}</p>
              <ul class="more" v-if="selectcity&&providx==provice.name" >
                <li v-for="city in provice.city" @click.stop="userInfo.city=city.name;selectprovice=false">{{city.name}}</li>
              </ul>
            </li>
          </ul>
        </div>
        <button class="submit rad" @click='enter' :disabled="!submit" :class="{'able':submit}">
          进入聊天
        </button>
        <button class="submit rad able" @click='registStatus=!registStatus' >
          返回登陆
        </button>
    </div>
    </transition-group>
  </div>
</template>
<script type="text/ecmascript-6">
    import citis from '../../assets/js/cities'
    import eventBus from '../../eventBus'
    export default{
      name:'Login',
			data(){
				return{
					registStatus:true,
          selectsex:false,
          selectprovice:false,
          selectcity:false,
          selectage:false,
          pwdcheck:false,
          testcheck:false,
          providx:'',
					userInfo:{
						name:'',
            sex:0,
						age:'',
						city:'',
            avator:'',
					},
          cities:citis,
          agelist:(function () {
            var agels=[];
            for (var i=12;i<200;i++){
              agels.push(i)
            }
            return agels
          })()
				}
			},
      mounted(){
        this.getCookie()
      },
      computed:{
        submit(){
          var inp=2;
          for(var key in this.userInfo){
            // if(item==null||item==undefined||item==''){
              if(this.userInfo[key].length>0){
                inp++;
              }
          }
          return Object.keys(this.userInfo).length==inp?true:false
        }
      },
			methods:{
				enter(){
					console.log(this.userInfo);
          var that=this;
          this.setCookie('QTalking',JSON.stringify(this.userInfo),3)
          // this.userInfo.img=`../../assets/img/3_0${sex}.png`;
          this.$http({
              url:'/qtserver/login',
              method:'POST',
              data:that.userInfo,
              transformRequest: [function (data) {
                let ret = ''
                for (let it in data) {
                  ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
              }],
          }).then(function(res){
              console.log('emit',that.userInfo);
              that.userInfo=res.data.userInfo
              that.$socket.emit('start',that.userInfo);//触发start
            eventBus.$emit('login',{login:res.data.loginStatus,user:that.userInfo})
          }).catch(function(err){
              console.log('err',err);
          })
          //设置cookie
  			},
        setTest(){
				  this.userInfo.name='qtalking'
          this.userInfo.pwd='123456'
          this.userInfo.age='27'
          this.userInfo.sex=0
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
                  this.enter();
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
			}
		}
</script>

<style lang="scss" scoped>
$rem:414/6.4rem;
@mixin uinput{
  input{
    height: 28/$rem;
    border: 1px solid #26a2ff;
    border-radius: 3px;
    text-indent: 10px;
    color: #26a2ff;
    font-size: 15px;
  }
  span{
    display: inline-block;
    width: 60/$rem;
    text-align: left;
  }
}
@mixin btn{
  width: 150/$rem;
  padding: 6/$rem 10/$rem;
  margin: 0 30/$rem;
  background: #26a2ff;
  border-radius: 3px;
  color: #fff;
  -box-shadow: 0 0 5px deepskyblue;
}
@mixin select{
  .list {
      width: 100%;
      font-size: 18px;
      position: absolute;
      background: #fff;
      overflow: auto;
      max-height: 100/$rem;
      z-index: 99;
      li {
        border-radius: 4px;
        &:hover {
          background: #bbb;
        }
        .more{
          width: 100%;
          position: absolute;
          left: 100%;
          top: 0;
          background: #fff;
          overflow: auto;
          max-height: 100/$rem;
          z-index: 100;
        }
      }
    }
}
@mixin rinput($width){
  width: $width+px;
  border-radius: 5px;
  padding: 3px 10px;
  text-align: center;
  background: #f0f0f0;
}
.loginPage {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #969096;
  height: 100%;
  .move {
    .move-enter-active {
      transition: all 0.5s linear 0.5s;
    }
    .move-enter {
      transform: translate3d(-100%, 0, 0);
    }
    .move-leave-active, .move-leave-to {
      transition: all 0.5s linear;
      transform: translate3d(100%, 0, 0);
    }

    .login {
      width: 100%;
      height: 360/$rem;
      box-sizing: border-box;
      padding-top: 80/$rem;
      font-size: 16px;
      color: #26a2ff;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .username {
        @include uinput
      }

      .password {
        @include uinput
      }

      .checkbox {
        input {
          margin: 0 5px;
        }

        line-height: 13px;
        font-size: 13px;
      }

      .confirm {
        width: 300/$rem;
        margin: 0 auto;

        .switch {
          @include btn
        }

        .ok {
          @include btn
        }
      }
    }

    .regist {
      width: 100%;
      height: (736-100-200)/$rem;
      padding-top: 30/$rem;
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      .rad {
        border: none;
        background: none;
        font-size: 25px;
      }
      .nickname {
        input {
          @include rinput(120)
        }
      }
      .pwd {
        input {
          @include rinput(120)
        }
      }
      .sex {
        position: relative;
        input {
          @include rinput(80)
        }
        @include select
      }
      .age {
        position: relative;
        input {
          @include rinput(80)
        }
        @include select
      }
      .city {
        position: relative;
        input {
          @include rinput(80)
        }
        @include select
      }

      .submit {
        background: #bbb;
        border-radius: 5px;
        padding: 7px 12px;
        -text-decoration: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;

        &.able {
          background: #26a2ff;
        }
      }

      .bottom {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50/$rem;
        background: #26a2ff;
      }
    }
  }
}
</style>
