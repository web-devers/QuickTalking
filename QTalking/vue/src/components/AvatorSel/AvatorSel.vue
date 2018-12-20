<template>
    <div class="choseHead" v-if="chooseflg">
      <div class="bg"></div>
      <div class="header-con">
        <div class="my-avator">
          <img :src="useavator" >
        </div>
        <div class="ava-list">
          <div v-for="(ava,i) in avalist" class="ava-item" @click="activeIdx=i;chooseHeader(i)">
            <img :src="staticurl+ava" alt="" :class="{'active':activeIdx==i}">
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="confirm" @click="confirm">设为头像</div>
        <i class="close" @click="closeSel"></i>
      </div>
    </div>
</template>

<script>
    import eventBus from '../../eventBus'
    export default {
        name: "AvatorSel",
        props:{
          chooseflg:{
            type:Boolean
          },
          useavator:{
            type: String
          },
          user:{
            type:Object
          }
        },
        data(){
          return {
            // defaultavator:this.user.sex=='男'?imgboy:imggirl,
            avalist:[
              'avatar-ben.png',
              'avatar-finn.png',
              'avatar-frodo.jpg',
              'avatar-gollum.jpg',
              'avatar-han.png',
              'avatar-leia.png',
              'avatar-luke.png',
              'avatar-poe.png',
              'avatar-rey.png',
              'avatar-samwise.jpg',
              'avatar-ts-barbie.png',
              'avatar-ts-bopeep.png',
              'avatar-ts-bullseye.png',
              'avatar-ts-buzz.png',
              'avatar-ts-hamm.png',
              'avatar-ts-jessie.png',
              'avatar-ts-potatohead.png',
              'avatar-ts-rex.png',
              'avatar-ts-sarge.png',
              'avatar-ts-slinky.png',
              'avatar-ts-squeeze.png',
              'avatar-ts-woody.png',
              'avatar-yoda.png',
              'barrett.jpg',
              'ghost-1.png',
              'ghost-3.png',
              'ghost-buster-1.png',
              'ghost-buster-2.png',
              'ghost-buster-3.png',
              'ghost-buster-4.png',
              'ghost-buster-5.png',
              'gozer.png',
              'ian-avatar.png',
              'marshmallow-man.png',
              'marty-avatar.png',
              'sarah-avatar.png.jpeg',
              'slimer.jpg',
              'spengler.jpg',
              'stantz.jpg',
              'thumbnail-bttf.png',
              'thumbnail-duckling-1.jpg',
              'thumbnail-duckling-2.jpg',
              'thumbnail-duckling-3.jpg',
              'thumbnail-duckling-4.jpg',
              'thumbnail-esb.png',
              'thumbnail-ghostbusters.png',
              'thumbnail-kitten-1.jpg',
              'thumbnail-kitten-2.jpg',
              'thumbnail-kitten-3.jpg',
              'thumbnail-kitten-4.jpg',
              'thumbnail-puppy-1.jpg',
              'thumbnail-puppy-2.jpg',
              'thumbnail-puppy-3.jpg',
              'thumbnail-puppy-4.jpg',
              'thumbnail-rotla.png',
              'thumbnail-terminator.png',
              'thumbnail-totoro.png',
              'tully.jpg',
              'venkman.jpg',
              'winston.jpg',
              'zuul.png'
            ],
            staticurl:'../../../static/avator/',
            activeIdx:null,
            selAvator:''
          }
        },
        mounted(){
          console.log(this.user)
        },
        methods:{
            chooseHeader(i){
              // console.log(this.staticurl+this.avalist[i])
              this.selAvator=this.avalist[i]
              eventBus.$emit('closesel',{sel:true,avator:this.avalist[i]})
            },
            closeSel(){
              eventBus.$emit('closesel',{sel:false})
            },
            confirm(){
              eventBus.$emit('closesel',{sel:false,avator:this.selAvator})
              this.$http({
                  url:'/qtserver/updavator',
                  method:'post',
                  data:{
                    user:this.user.name,
                    avator:this.selAvator
                  },
                  transformRequest: [function (data) {
                      let ret = ''
                      for (let it in data) {
                        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                      }
                      return ret
                    }],
              }).then(function(res){
                console.log(res.data);
              }).catch(function(err){
                console.log(err);
              })
            }
        }
    }
</script>

<style lang="scss" scoped>
 $rem:414/6.4rem;
.choseHead{
      .bg{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #2d374b;
        z-index: 1000;
        filter: alpha(0.6);
      }
      .header-con{
        position: absolute;
        top:80/$rem;
        left: 50%;
        width: 350/$rem;
        height: 500/$rem;
        margin-left: -0.5*350/$rem ;
        z-index: 1001;
        background: #fff;
        box-shadow: 0 0 5px #2d374b;
        .my-avator{
          margin-top: 10/$rem;
          height: 80/$rem;
          position: relative;
          img{
            margin: auto;
            border-radius: 50%;
            box-shadow: 0 0 10px #000;
          }

        }
        .ava-list{
          width: 100%;
          height: (500-100)/$rem;
          padding-top: 10/$rem;
          overflow: auto;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: flex-start;
          .ava-item{
            width: 0.2*350/$rem;
            height: 0.2*350/$rem;
            overflow: hidden;
            img{
              width: 80%;
              height: 80%;
              border-radius: 50%;
              box-shadow: 0 0 5px #000;
              &.active{
                box-shadow: 0 0 15px deepskyblue;
              }
            }
          }
        }
      }
      .footer{
        position: absolute;
        bottom:100/$rem;
        width: 100%;
        height: 30/$rem;
        z-index: 1001;
        .confirm{
          color:#fff;
          margin-bottom: 20/$rem;
          font-size: 18/$rem;
          line-height: 24/$rem;
        }
       .close{
            width: 20/$rem;
            height: 20/$rem;
            display: block;
            margin: auto;
            background: url("../../assets/img/icon/icon_delete.png") 0 0/cover;
          }
      }
    }
</style>
