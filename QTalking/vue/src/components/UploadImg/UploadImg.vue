<template>
    <div class="uploadimg">
        <div class="back">
          <i @click='back'>
            <img width="100%" src="../../assets/img/1_05.png"></i>
          <p>图片发表</p>
        </div>
        <div class="content" v-if="!showSwip">
          <ul class="msg-cont">
            <li v-for="it,idx in msgShowList">
              <div class="img-head">
                <div class="avator">
                  <img :src="staticurl+it.avator" alt="">
                </div>
                <div class="name">
                  <p>{{it.user}} </p>
                  <span>{{it.addTime|subtime }}</span>
                </div>
              </div>
              <p class="img-word">{{it.text}}</p>
              <div class="flex-row imgcnteq1" v-if="it.imglist.length==1">
                <img v-for="(img,i) in it.imglist" :src="'/qtserver'+img" alt="" @click='swip(i,it.imglist)'>
              </div>
              <div class="flex-row imgcnteq2" v-if="it.imglist.length==2">
                <img v-for="(img,i) in it.imglist" :src="'/qtserver'+img" alt="" @click='swip(i,it.imglist)'>
              </div>
              <div class="flex-row imgcnteq3" v-if="it.imglist.length==3">
                <img v-for="(img,i) in it.imglist" :src="'/qtserver'+img" alt="" @click='swip(i,it.imglist)'>
              </div>
              <div class="flex-row imgcnteq4" v-if="it.imglist.length==4">
                <img v-for="(img,i) in it.imglist" :src="'/qtserver'+img" alt="" @click='swip(i,it.imglist)'>
              </div>
              <div class="flex-row imgcntge5" v-if="it.imglist.length>=5">
                <img v-for="(img,i) in it.imglist" :src="'/qtserver'+img" alt="" @click='swip(i,it.imglist)'>
              </div>
            </li>
          </ul>
        </div>
        <div class="send">
          <input type="text" v-model="qmsglist.text">
          <span class="s-img" :class="{'activate':showimg}" @click="showimg=!showimg">+</span>
          <div class="s-btn" @click="sendMsg">发表</div>
        </div>
        <div class="img-show" v-if="showimg">
          <input type="file" id="img-btn" @change="getuploadImg($event)" multiple="multiple" >
          <label for="img-btn" class="img-btn" >
            <i class="pic"></i>
            <p>上传</p>
          </label>
          <div class="img-dis" >
              <div class="flex">
                <div class="img-dtl" v-for="(it,idx) in qmsglist.imgs">
                  <img width="100%" height="100%" :src="it.img" alt="">
                  <!--<p>it.name</p>-->
                  <i class="remove" @click="remove(idx)"></i>
                </div>
              </div>
          </div>
        </div>
        <!--<keep-alive>-->
          <MySwiper :imgs="SwipList" :idx="swipidx" v-if="showSwip"></MySwiper>
        <!--</keep-alive>-->
    </div>
</template>

<script>
    import MySwiper from '../MySwiper/MySwiper'
    import eventBus from '../../eventBus'

    export default {
        name: "uploadImg",
        props:{
          user: {
            type: Object
          }
        },
        components:{
          MySwiper
        },
        data () {
          return {
            username:'',
            showimg:false,
            qmsglist:{
              text:'',
              imgs:[]
            },
            msgShowList:[],
            showSwip:false,
            SwipList:[],
            swipidx:0,
            dpr:window.devicePixelRatio,
            staticurl:'../../../static/avator/'
          }
        },
        created(){
          this.getMsgList();
        },
        mounted(){
          var reg=/(\/\w+):([\u4e00-\u9fa5_a-zA-Z0-9]+$)/;
          this.username=this.$route.path.match(reg)[2];
        },
        methods:{
          back(){
            // var key=this.username+'pic'
            // var value=this.imgList
            // if(localStorage.getItem(key)){
            //   localStorage.removeItem(key);
            // }
            // localStorage.setItem(key, JSON.stringify(value));
            // console.log(JSON.parse(localStorage.getItem(key)));
            window.history.go(-1)
          },
          getMsgList(){
            this.$http.get('/qtserver/uploadimgs').then(res=>{
              console.log(res)
              if(res.data.result=="success"){
                this.msgShowList=[]
                var imglist=res.data.data;
                imglist.forEach(it=>{
                  this.msgShowList.push({
                    user:it.username,
                    text:it.text,
                    avator:it.avator,
                    imglist:JSON.parse(it.imglist),
                    addTime:it.add_time
                  })
                })
              }else{

              }
            }).catch(err=>{
              console.log(err)
            })
          },
          sendMsg(){
            var urllist=Array.from(this.qmsglist.imgs,it=>it.img)
            console.log(urllist,this.qmsglist)
            if(this.qmsglist.text.length>0||this.qmsglist.imgs.length>0){
              this.$http({
                url:'/qtserver/uploadimgs',
                method:'post',
                data:{
                  // user:this.user,
                  user:this.username,
                  text:this.qmsglist.text,
                  imgs:JSON.stringify(urllist)
                },
                transformRequest: [function (data) {
                  let ret = ''
                  for (let it in data) {
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                  }
                  return ret
                }],
              }).then(res=>{
                 console.log(res.data);
                 this.qmsglist.text=''
                 this.qmsglist.imgs=[]
                 this.showimg=false;
                 this.getMsgList();
              })
            }
          },
          getuploadImg(e) {
            var upimgs = e.target.files;
            for (var i=0;i<upimgs.length;i++){
              if(i<=8){
                var name=upimgs[i].type.toLowerCase().split('.')[0];
                var type=upimgs[i].type.toLowerCase().split('/')[1];
                var that=this
                console.log(type)
                if(type==="jpeg"||type==="png"){
                  var reader=new FileReader();
                  reader.readAsDataURL(upimgs[i]);
                  reader.onload=async function (e) {
                    var base64=await that.compress(e.target.result,type)
                    // var blob=that.dataURItoBlob(base64);
                    that.qmsglist.imgs.push({
                      name:name,
                      img:base64
                    })
                  }
                }
              }
            }
          },
          swip(index,imgs){
            this.SwipList=[]
            imgs.forEach(img=>{
              this.SwipList.push("/qtserver"+img)
            })
            this.swipidx=index
            this.showSwip=true;
            eventBus.$on("swiperclose",function (flag) {
              this.showSwip=flag.showSwip
            }.bind(this))
          },
          // 压缩图片
          compress(img,type) {
            return new Promise((resolve,reject)=>{
              let canvas = document.createElement("canvas");
              let imgDom = new Image();
              let ctx = canvas.getContext("2d");
              imgDom.src = img;
              imgDom.onload= function(){
                let width = imgDom.width;
                let height = imgDom.height;
                let ratio = this.getPixelRatio(ctx);
                canvas.style.width = width;
                canvas.style.height = height;
                canvas.width = width;
                canvas.height = height;
                // 铺底色
                ctx.fillStyle = "#fff";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(imgDom, 0, 0, width, height);
                let ndata = canvas.toDataURL("image/"+type, 0.3);
                resolve(ndata);
              }.bind(this)
            })
          },
          // base64转成bolb对象
          dataURItoBlob(base64Data) {
            var byteString;
            if (base64Data.split(",")[0].indexOf("base64") >= 0)
              byteString = atob(base64Data.split(",")[1]);
            else byteString = unescape(base64Data.split(",")[1]);
            var mimeString = base64Data
              .split(",")[0]
              .split(":")[1]
              .split(";")[0];
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
          },
          remove(idx){
            console.log(idx)
            this.qmsglist.imgs.splice(idx,1)
          },
          getPixelRatio(context){
            var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
          }
        },
        filters:{
            subtime(str){
              return str.substring(0,10)+' '+str.substring(11,19)
            }
        }
    }
</script>

<style lang="scss" scoped>
  $rem:414/6.4rem;
  .uploadimg{
    position:fixed;
		top:0/$rem;
		left:0/$rem;
    display: flex;
    flex-direction: column;
		min-width:414/$rem;
		width:100%;
		height: 100%;
    -height:(736)/$rem;
		background:#fff;
		z-index:10;
		.back{
			width:100%;
			height:36/$rem;
			background:#26a2ff;
			-background:transparent;
			font-size:16px;
			line-height:36px;
			color:#fff;
			text-align:center;
			i{
        width: 36/$rem;
        height: 36/$rem;
				float:left;
				margin-right:-(50/$rem);
			}
		}
    .content{
      flex:1;
      overflow-y: auto;
      .msg-cont{
        width: 100%;
        text-align: left;
        .img-head{
          display: flex;
          padding-bottom: 5/$rem;
          margin: 3/$rem 15/$rem -5/$rem;
          border-bottom: 1px dashed #bbb;
          .avator{
            width: 36/$rem;
            height: 36/$rem;
            img{
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .name{
            margin-left: 5/$rem;
            font-size: 13px;
            line-height: 20/$rem;
            p{
              width: 100/$rem;
              color: deepskyblue;
            }
            span{
              font-size: 12px;
              color: #bbb;
            }
          }
        }
        .img-word{
          margin: 15/$rem 0 10/$rem 15/$rem;
          line-height: 12/$rem;
          font-size: 15px;
        }
        li{
          .flex-row{
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin-top: -5/$rem;
            padding: 10/$rem;
            overflow: auto;
            img{
              margin: 4/$rem;
              box-shadow: 0 0 5px #bbb;
              height: 100%;
            }
            &.imgcnteq1{
              img{
                width:98% ;
              }
            }
            &.imgcnteq2{
              img{
                width:47% ;
              }
            }
            &.imgcnteq3{
              img{
                width:32% ;
              }
            }
            &.imgcnteq4{
              flex-wrap: wrap;
              img{
                width: 47.9%;
              }
            }
            &.imgcntge5{
              flex-wrap: wrap;
              img{
                width: 31%;
              }
            }
          }
        }
      }
    }
    .send{
      height: 32/$rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input{
        flex: 1;
        height: 21/$rem;
        margin: 0 3px;
        border: 1px solid #26a2ff;
        border-radius: 3px;
      }
      .s-img{
        width: 25/$rem;
        height: 25/$rem;
        margin: 0 7px;
        border-radius: 50%;
        line-height: 25/$rem;
        font-size: 18px;
        color:#bbb;
        border: 1px solid #bbb;
        &.activate{
          color:#26a2ff;
          border: 1px solid #26a2ff;
        }
      }
      .s-btn{
        width: 64/$rem;
        height: 24/$rem;
        margin: 0 3px;
        border-radius: 3px;
        background:#26a2ff;
        font-size:16px;
        line-height:24/$rem;
        color:#fff;
        text-align:center;
      }
    }
    .img-show{
      min-height: 64/$rem;
      display: flex;
      align-items: flex-start;
        #img-btn{
          display: none;
        }
        .img-btn{
          width: 30/$rem;
          height: 20/$rem;
          margin: 12/$rem 0 12/$rem 18/$rem;
          font-size: 12px;
          .pic{
            display: block;
            width: 30/$rem;
            height: 24/$rem;
            background:url('../../assets/img/upimg.png') 0 0/cover;
          }
        }
        .img-dis{
          flex: 1;
          min-height: 60/$rem;
          display: flex;
          justify-content: flex-start;
          padding: 0 15/$rem;
          .flex{
            display: flex;
            flex-wrap: wrap;
            -overflow: auto;
            .img-dtl{
              position: relative;
              width: 50/$rem;
              margin:8/$rem 3.6/$rem;
              box-shadow: 0px 0px 2px rgba(0,0,0,1);
              .remove{
                position: absolute;
                top:-7px;
                right: -7px;
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border:1px solid #bbb;
                background: url('../../assets/img/ic_off.png') 0 0/cover;
              }
            }
          }
        }
    }
  }
</style>
