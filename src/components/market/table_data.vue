<template>
  <div class="Table">
    <table cellspacing ="2" cellpadding ="2">
      <tr style="color:#3486DA">
        <!-- <th class="tab_title" style="width:%">排名</th> -->
        <th class="tab_title" style="width:20%">商户名称</th>
        <th class="tab_title" style="width:25%">交易量(kg)</th>
        <th class="tab_title" style="width:28%">交易额(元)</th>
        <th class="tab_title" style="width:30%">时间</th>
      </tr>
    </table>
    <vue-seamless-scroll
        :data="mydata"
        class="seamless-warp"
        :class-option="classOption"
      >
     <table cellspacing ="2" cellpadding ="2">
      <tr v-for="(item,index) in mydata" :key="index">
        <!-- <td style="width:20%">{{index+1 }}</td> -->
        <td style="width:20%">{{item.UserName}}</td>
        <td style="width:25%">{{item.NetWeight}}</td>
         <td style="width:28%">{{item.TradeMoney}}</td>
        <td style="width:30%">{{item.myTime}}</td>
      </tr>
    </table>
     </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import _getdata from '@/commit/market'
export default {
  props: ["marketId"],
  data() {
    return {
      mydata: [
        { name: "1",
          num: '纬四路农贸市场',
          state: "2131", 
        },{ name: "2",
           num: '经八路农贸市场',
          state: "21321", 
        },{ name: "3",
           num: '多之彩市场',
          state: "2131", 
        },{ name: "4",
          num: '燕庄农贸市场',
          state: "6575", 
        }
        
      ]
    };
  },
    components: {
    vueSeamlessScroll
  },
  computed:{
    classOption() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 43, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 ,// 单步运动停止的时间(默认值1000ms)
        interval3:null
      };
    },
  },
  mounted(){
    this.getDaytop10()
      this.interval3 = window.setInterval(() => {
        setTimeout(this.getDaytop10, 0);
      }, 720000);
  },
   beforeDestroy() {
    clearInterval(this.interval3);
     this.interval3 = null;
  },
  methods:{
     renderTime(date) {
        var dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
      },
    getDaytop10(){
      var that = this;
      var data = {
        id:that.marketId
      }
      _getdata.getNowDataInfo(data).then(res =>{
        if(res.data.return_code == 0){
          that.mydata = res.data.datas
          // console.log(that.mydata,"实时交易数据")
          that.mydata.forEach(res => {
            res.myTime = this.renderTime(res.UpLoadTime).split(' ')[1]

          })
        // console.log( that.mydata,"实时交易数据")
        }
      })
    },

  },
};
</script>
<style scoped lang='scss'>
// @import '../../assets/css/echarts.scss';
.seamless-warp {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.Table {
  border-radius: 20px;
  color: white;
  font-weight: 500;
  width: 99%;
  line-height: 100%;
  height: 100%;
  overflow: hidden;
  table {
    width: 100%;
    tr {
      width: 100%;
      th{
        font-size: 15px; 
        //  width: 20%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        // border: 1px solid  rgba(0,0,0,0);
        background-color: rgba(52,134,218,0.7);
        color: #ffffff;
        font-weight: 600;
      }
      td {
        // width: 25%;
        height: 36px;
        line-height: 36px;
        text-align: center;
        background-color: rgba(34,63,132,0.7);
        font-size: 14px;
      }
    }
  }
}
.tab_title{
 
}
</style>