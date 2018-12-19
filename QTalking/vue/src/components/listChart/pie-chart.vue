<template>
	<div ref="rose_pie" style="height: 100%;width: 100%;"></div>
</template>
<script type="text/javascript">
import echarts  from 'echarts'
export default {
  name: 'pieChart',
  props:{
      rosepiedata: {
          legendData: Array,
          datas:Array ,
          colors: Array,
          format:String,
      }
  },
  data () {
    return{
        // legendData:[],
        // datas : [],
        // colors : [] //图例颜色
    }
  },
  watch:{
    rosepiedata:{
      handler(cur,old){
        console.log(cur)
        this.createPie();
      },
      deep:true
    }
  },
  mounted () {
    this.$nextTick(function(){
          if(this.rosepiedata.legendData.length>0){
            this.createPie();
          }
      })
  },
  methods:{
    createPie:function(){
      console.log(this.rosepiedata)
      // var legendData,datas,colors=[];
      var legendData=this.rosepiedata.legendData;
      var datas=this.rosepiedata.datas;
      var colors=this.rosepiedata.colors;
      var Ypox=this.rosepiedata.Ypox||'50%';
      var format=this.rosepiedata.format||'{a|{c}} \n {b|{b}}'
      var pieChart=echarts.init(this.$refs.rose_pie);
      var option = {
          legend: {
              show:false,
              x : 'center',
              y : 'bottom',
              data:legendData,
              itemGap:20,
              textStyle: {
                  color : 'rgb(153, 153, 153)',
              }
          },
          color:colors,
          textStyle : {
              color :  'rgb(153, 153, 153)',
              fontSize : "12"
          },
          tooltip : {
              trigger: 'item',
              textStyle : {
                  color : '#333'
              },
          },

          calculable : true,
          series : {
              itemStyle : {
                  normal : {
                      label : {
                          color:'rgb(153, 153, 153)',
                          show : true
                      },
                      labelLine : {
                          show : true
                      }
                  },
                  emphasis : {
                      label : {
                          show : true
                      },
                      labelLine : {
                          show : true
                      }
                  }
              },
              label:{            //饼图图形上的文本标签
                  normal:{
                      show:true,
                      textStyle : {
                          fontWeight : 300 ,
                          fontSize : 14    //文字的字体大小
                      },
                      formatter:format,
                      rich:{
                          a:{
                              fontFamily : 'PingFangSC-Regular',
                              color:'#666666',
                              align: 'center',
                              // bold:true,
                              fontWeight : 600 ,
                              fontSize : 18},

                          b:{
                              fontFamily : 'PingFangSC-Regular',
                              color:'#999999',
                              align: 'center',
                              fontSize : 12},
                      },
                  },
              },
              name:'面积模式',
              type:'pie',
              radius : [50, 85],
              center : ['50%', Ypox],
              roseType : false,
              data:datas
          }
                  };
      // 使用刚指定的配置项和数据显示图表。
      pieChart.setOption(option);
      pieChart.dispatchAction({
          type : 'showTip'
      }, function() {})
    }
  }
}

</script>
<style lang="scss">

</style>
