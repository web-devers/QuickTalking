<template>
    <div class="dict">
        <div style="font-size: 24px;text-align: center" @click="back">X</div>
        <div class="box">devicePixelRatio:{{dpr}}</div>
        <!--<div class="box2 border"></div>-->
        <div class="box3">
          <div @click="locate('http://47.106.102.92:8081/ele/');return false">饿了吗</div>
        </div>
        <div class="box4">
          <div @click="locate('http://47.106.102.92:8081/ionic/');return false">电影</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dict",
        data(){
          return{
            dpr:window.devicePixelRatio
          }
        },
        methods:{
          back(){
            window.history.go(-1)
          },
          locate(url){
            window.top.location.href=url
          }
        }
    }
</script>

<style lang="scss" scoped>
  @mixin border1($color){
      -border: 1px solid $color;
      @media screen and (-webkit-min-device-pixel-ratio: 2) {
        -border: 0.5px solid $color;
        background-position: left top;
        background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.5,transparent),color-stop(0.5,#e0e0e0),to(#e0e0e0));
      }
      @media screen and (-webkit-min-device-pixel-ratio: 3) {
        -border: 0.333333px solid $color;
        background-position: left top;
        background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.5,transparent),color-stop(0.5,#e0e0e0),to(#e0e0e0));
      }
  }
  @mixin border2($radius,$color){
    position: relative;
    @media screen and (-webkit-min-device-pixel-ratio: 2){
      &:before{
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 200%;
        height: 200%;
        left: 0;
        top: 0;
        border-radius: $radius+px;
        border:1px solid $color;
        -webkit-transform:(scale(0.5));
        -webkit-transform-origin: 0 0;
        transform:(scale(0.5));
        transform-origin: 0 0;
      }
    }
    @media screen and (-webkit-min-device-pixel-ratio: 3){
      &:before{
        content: "";
        pointer-events: none; /* 防止点击触发 */
        box-sizing: border-box;
        position: absolute;
        width: 300%;
        height: 300%;
        left: 0;
        top: 0;
        border-radius: $radius +px;
        border:1px solid $color;
        -webkit-transform:(scale(0.333));
        -webkit-transform-origin: 0 0;
        transform: (scale(0.333));
        transform-origin: 0 0;
      }
    }
  }
$rem:414/6.4rem;
	.dict {
    position: fixed;
    top: 0/$rem;
    left: 0/$rem;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: #fff;
    .box{
      width:100%;
      height: 1px;
      margin: 20px auto ;
      @include border1(deepskyblue)
    }
    .box2{
      width: 100%;
      height: 50px;
      margin: 20px auto ;
    }
    .box3{
      width: 100%;
      height: 50px;
      margin: 20px auto ;
      border: 1px solid #000;
    }
    .box4{
      width: 100%;
      height: 50px;
      margin: 20px auto ;
      @include border2(8,deepskyblue)
    }
  }
</style>
