<template>
    <div id="zhe" style="width: 100%;height:100%;color:white;" class="brokenLine_box"></div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import _getdata from '@/commit/market'
export default {
  props: ["marketId"],
  data(){
    return {
      interval3: null,
      myecharts:[],
      mydata:[],
      house:[],
      myMoney:[],
      tradeWeight:[],//重量
    }
  },
    mounted() {
    this.echarts();
   this.interval3 = window.setInterval(() => {
      setTimeout(this.echarts, 0);
    }, 108000000);
  },
  beforeDestroy() {
    clearInterval(this.interval3);
     this.interval3 = null;
    console.log("beforDestroy");
  },
  methods: {
     echarts() {
       var that = this;
      var data = {
        id:that.marketId
      }
       _getdata.get24total(data).then(res => {
        if(res.data.return_code == 0){
          that.mydata = res.data.datas
          that.myMoney = [];
          that.house = [];
          that.tradeWeight = [];
          that.mydata.forEach((res,index) => {
            if(index%2==0) {
            that.myMoney.push(res.money)
            that.house.push(res.h); 
            that.tradeWeight.push(res.tradeWeight);
            }
          })
          that.rows();
        } 
      });
    },
    rows() {
      var mChart = this.$echarts.init(document.getElementById("zhe"));
      mChart.setOption({
        legend: {
          // data: ["行上流量", "行下流量"],
          data: ['交易额'],
          textStyle: {
            color: "#8AB4E1"
          },
          top: "10px",
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        axisLabel: {
          color: "#8AB4E1"
        },

        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.house,
          name:'时',
           axisLine : {
                lineStyle : {
                    color : '#3486DA'
                }
            },
        },
        yAxis: {
          type: "value",
          name:'元',
           splitLine: {//分割线配置
						// show:false,
						lineStyle: {
							color: "#162B5F",
						}
          },
          axisLine : {
                lineStyle : {
                    color : '#3486DA'
                }
            },
        },
        grid: {
          left: "10px",
          right: "40px",
          bottom: "15px",
          top:'35',
          containLabel: true
        },
        axisLine: {
          lineStyle: {
            color: "white"
          }
        },
        axisTick: {
          lineStyle: {
            color: "white"
          },
          onZero: true
        },
        series: [
          {
            name: "交易额",
            data:this.myMoney,
            type: "line",
            tooltip: {
              triggerOn: "none",
              position: function(pt) {
                return [pt[0], 130];
              }
            },
            toolbox: {
              itemSize: 25,
              top: 55,
              feature: {
                dataZoom: {
                  yAxisIndex: "none"
                },
                restore: {}
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgba(255,35,145,255)"
                  },
                  {
                    offset: 1,
                    color: "rgba(255,35,145,0)"
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: "#FF2391"
              }
            }
          },
        //   {
        //     name: "交易量",
        //     data: this.tradeWeight,
        //     type: "bar",
        //     tooltip: {
        //       triggerOn: "none",
        //       position: function(pt) {
        //         return [pt[0], 130];
        //       }
        //     },
        //     toolbox: {
        //       itemSize: 25,
        //       top: 55,
        //       feature: {
        //         dataZoom: {
        //           yAxisIndex: "none"
        //         },
        //         restore: {}
        //       }
        //     },
        //     areaStyle: {
        //       normal: {
        //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //           {
        //             offset: 0,
        //             color: "rgba(0,49,245,1)"
        //           },
        //           {
        //             offset: 1,
        //             color: "rgba(0,49,245,0)"
        //           }
        //         ])
        //       }
        //     },
        //     itemStyle: {
        //       normal: {
        //         color: "#0031FF"
        //       }
        //     }
        //   }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// @import '../../assets/css/echarts.scss';
</style>