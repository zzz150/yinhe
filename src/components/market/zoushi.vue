<template>
    <div id="mains" style="width: 100%;height:100%;"></div>
</template>

<script>
import _getdata from '@/commit/market'
export default {
  props: ["marketId"],
  data() {
    return {
      mydata:[],
      house:[],
      innum:[],
      outnum:[],
      last:[],
      intervalzoushi:''
    };
  },
  mounted() {
    this.getkeliu()
    
    this.intervalzoushi = window.setInterval(() => {
      setTimeout( this.getkeliu(), 0);
    }, 20000);
    
  },
  beforeDestroy() {
      var that = this;
    clearInterval(this.intervalzoushi);
     this.interval = null;
     this.mydata = []
      that.house=[]
      that.innum=[]
      that.outnum=[]
      that.last=[]
    console.log("beforDestroy");
  },
  methods: {
    getkeliu(){
      var that = this;
      var data = {
        id:that.marketId
      }
      _getdata.get24liu(data).then(res =>{
        // console.log(res.data)
        if(res.data.return_code == 0){
          that.mydata = res.data.datas
           that.house=[]
          that.innum=[]
          that.outnum=[]
          that.last=[]
          var num = 0
          that.mydata.forEach((res,index) => {
            num += res.innum
            if(index%2==1) {
              that.innum.push(res.innum)
              that.house.push(res.timesolt)
              that.outnum.push(res.outnum)
              that.last.push(res.innum-res.outnum<=0?0:res.innum-res.outnum);
            }
          })
          this.$emit('innum',num)
          that.zoushi();
        }
      })
    },
    zoushi() {
      var myChart = this.$echarts.init(document.getElementById("mains"));
      myChart.setOption({
        legend: {
          // data: ["行上流量", "行下流量"],
          data: ['进入','离开','剩余'],
          textStyle: {
            color: "#8AB4E1"
          },
          top: "10px",
           show: true,
        },
          tooltip: {
            transitionDuration:0,
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        xAxis: {
          type: "category",
          data: this.house,
          boundaryGap: false, 
          name:'时', 
          nameTextStyle :{
              fontSize: 12,
                color : '#fff'
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c0d9ff",
              align: "right",
              fontSize: 10 /*文字大小*/
            }
          },
          axisLine: {
            lineStyle: {
              color: "#c0d9ff" //轴的颜色
            }
          },
          axisTick: {
            lineStyle: {
              color: "#3486DA" //轴上点的颜色
            }
          }
        },
         grid: {
					left: "10",
					right: "30",
					bottom: "10",
					top: "40",
					containLabel: true
				},
        yAxis: {
          type: "value",
          axisLabel: {
            show: true,
            textStyle: {
              color: "#c0d9ff",
              align: "right",
              fontSize: 10 /*文字大小*/
            }
          },
          name:'人次', 
          nameTextStyle :{
              fontSize: 12,
                color : '#fff'
          },
          axisLine: {
            lineStyle: {
              color: "#c0d9ff" //轴的颜色
            }
          },
          axisTick: {
            lineStyle: {
              color: "#3486DA" //轴上点的颜色
            }
          },
          splitLine: {//分割线配置
						// show:false,
						lineStyle: {
							color: "#162B5F",
						}
          },
        },
        series: [
          { 
            name:'进入',
            data: this.innum,
            type: "line",
            // smooth: true,
             color: '#CD32E6',
            itemStyle: {
                lineStyle: {
                  color: "#CD32E6"
                }
            },
      
          },
          { 
            name:'离开',
            data: this.outnum,
            type: "line",
            // smooth: true,
            color: '#FFFF00',
            itemStyle: {
                lineStyle: {
                  color: "#FFFF00"
                }
            }
          },
          { 
            name:'剩余',
            data: this.last,
            type: "line",
            // smooth: true,
            color: '#03DCF8',
            itemStyle: {
              // normal: {
              //   color: "#f4ffff",
                lineStyle: {
                  color: "#03DCF8"
                }
              // }
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss">
</style>