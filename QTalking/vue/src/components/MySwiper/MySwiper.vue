<template>
    <div class="swiper-outer" v-if="imgs.length>0">
      <div class="bg" @click='clswip()'></div>
      <div class="control" >
        <i class="fl" @click='clswip()'></i>
        <!-- <a :href="" download=".png"></a> -->
        <i class="fr" @click='download'></i>
      </div>
      <transition >
        <div class="swiper-container"  ref='swip'>
          <ul class="swiper-wrapper">
            <li class="swiper-slide" v-for="(item,index) in imgs">
              <img :src="item" width="100%" @click='dw(item)'>
            </li>
          </ul>
          <div class="swiper-scrollbar"></div>
        </div>
      </transition >
    </div>
</template>

<script>
  	import Swiper from 'swiper';
    import eventBus from '../../eventBus'
    export default {
        name: "Swiper",
        props:{
          idx:{
            default:0,
            type: Number
          },
          imgs:{
            type:Array
          },
          clear:{
            type:Boolean
          }
        },
        data(){
          return {
          }
        },
        watch:{
          idx:function (cur,old) {
            if(cur!=0){
              this.$nextTick(()=>{
                this.swiper.slideTo(cur, 50, false);
                this.swiper.autoplay.start();
              })
            }
          }
        },
        created() {
        },
        mounted() {
           this.initSwip(this.idx);
        },
        methods:{
          initSwip(n){
            this.swiper=new Swiper('.swiper-container', {
            // this.swiper=new Swiper(this.$refs.swip, {
              initialSlide :n,
              loop:false,
              // slidesPerView: this.imgList.length,
              effect : 'cube',//cube,coverflow,flip,fade
              autoplay: {
                delay: 1800,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              },
              scrollbar: {
                 el: '.swiper-scrollbar',
              },
              // pagination : '.swiper-pagination',
              direction : 'horizontal',
              autoHeight: false,
              // effect: 'fade'
            })
          // setTimeout(() => {
           //   this.swiper.slideTo(7, 50, false);
           //}, 500);
          },
          clswip(){
            this.swiper.autoplay.stop();
            eventBus.$emit("swiperclose",{showSwip:false})
          },
          download(){
          },
          dw(url){
            window.open(url)
          },
          substring(str){
            str=str.substr(9)
            return str.replace(/\"/g,"");
          }
        },
        filters:{

        }
    }
</script>

<style lang="scss" scoped>
$rem:414/6.4rem;
.swiper-outer{
  .bg{
			position:fixed;
			top:0;
			width:100%;
			height:100%;
			-padding-top:20/$rem;
			background:#000;
      z-index: 98;
			-filter:blur(5px);
		}
		.control{
			position:absolute;
			top:18/$rem;
			width:100%;
			height:20/$rem;
      z-index: 99;
			i{
				font-style:normal;
				line-height:36/$rem;
				&.fl{
          width:20/$rem;
          height:20/$rem;
					float:left;
					margin-left:10/$rem;
          background:url('../../assets/img/icon/icon_delete.png') 0 0/cover;
				}
				&.fr{
					float:right;
          width:24/$rem;
				  height:24/$rem;
					margin:3/$rem 10/$rem 0 0;
					background:url('../../assets/img/icon/order_icon_down.png') 0 0/cover;
				}
			}
		}
  .swiper-container{
			position:absolute;
			top:36/$rem;
			width:100%;
			height:auto;
			height:100%;
      z-index: 99;
			.swiper-wrapper{
				.swiper-slide{
					width:100%;
					box-sizing:border-box;
					-position:absolute;
					width:100%;
          -height: 100%;
          -top:50%;
          -left: 50%;
          -transform: translate(-50%,-50%);
					height:auto;
					margin:auto;
					img{
						width:100%;
						box-shadow:0px 0px 2px #fff;
					}
				}
			}
			.swiper-scrollbar{
				bottom:0/$rem;
				background:#333;
			}
		}
}
</style>
