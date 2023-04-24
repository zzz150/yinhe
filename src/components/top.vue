<template>
  <div id="header_top" >
   
      <div id="nav" :style="{background:'url('+navIcon1+') no-repeat',backgroundSize:bgSize, 'background-position': 'center center'}">
        <!-- <img src="../assets/images/LOGO.png" alt="" class="header_LOGO"> -->
        <div class="dataTime_l">{{mytime}}</div> 
        <!-- 市投丰乐农贸市场智慧数据平台 -->
        
        <!-- <div class="dataTime">
          <div :class="tabShow == 0 ? 'tab_data':'' " @click="tabday(0)">年</div>
          <div :class="tabShow == 1 ? 'tab_data':'' " @click="tabday(1)">月</div>
          <div :class="tabShow ==2 ? 'tab_data':'' " @click="tabday(2)">日</div>
        </div> -->
         <div class="dataTime_du" style="">
          郑州天气：{{tianqi}}  温度:{{now}}℃
         </div>
      </div>
  </div>
</template>

<script>
import _getdata from '../commit/market';
export default {
   name: 'header_top',
  data() {
    return {
      navIcon1:require("../assets/images/bg_top_tit.png"),
      bgSize:'80% 80%',
      tabShow:0,
      mytime:'',
      weatherList:[],
      now:'',
      tianqi:''
    }
  },
  mounted(){
    setInterval(this.getNowFormatDate,1000);
    this.weather()
  },
  methods:{
    //获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var year = date.getFullYear();
      var week = date.getDay();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      
      var second = date.getSeconds(); 
      if(second<10){
        second='0'+second
      }
      if(minute<10){
        minute='0'+minute
      }
      if(hour<10){
        hour='0'+hour
      }
      var weeks = ["日","一","二","三","四","五","六"]; 
      var getWeek = "星期" + weeks[week];
      this.mytime = hour+':'+minute+':'+second+' ' +year+'年'+month+'月'+day+'日  '+getWeek 
      // console.log(this.mytime)  
      },
    tabday(e){
        this.tabShow = e
    },
    weather(){
      var that = this;
      var data ={
        city:"郑州"
      }
       _getdata.today(data).then(res =>{
         that.weatherList = res.data.data.forecast
         that.tianqi = that.weatherList[0].type
          that.now = res.data.data.wendu
      })
    },
  }
}
</script>

<style lang="scss" scoped>
// 年月日切换
.tab_data{
  background: url("../assets/images/year.png") no-repeat !important;
   background-size: 100% 100% !important;
   background-position: 3px 3px !important;
}
#header_top{
    width: 100%;
    height: 100%;
    /* border: 1px solid rgb(255, 253, 253); */
    position: absolute;
    top: 0;
    z-index: 100;
}
#nav {
  width: 100%;
  box-sizing: border-box;
  min-width: 9%;
  font-weight: bold;
  color: #fff;
  height: 85px;
  line-height: 85px;
  /* padding: 20px; */
  font-size: 26px;
  text-align: center;
  // border: 1px solid #ffffff;
   
   position: relative;
   animation: cpbottom 0.7s linear forwards;
 /* top: 0; */
  
}
@keyframes cpbottom {
      from {
        top: -85px;
      }
      to {
        top: 0;
      }
      0% {
        opacity: 0; /*初始状态 透明度为0*/
      }
      50% {
        opacity: 0.5; /*中间状态 透明度为0*/
      }
      100% {
        opacity: 1; /*结尾状态 透明度为1*/
      }
    }
.dataTime{ //日期切换
  color: #ffffff;
  width: 300px;
  height: 30px;
  float: right;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  // border: 1px solid #fff;
  position: absolute;
  right: 0px;
  top: 15px;
  box-sizing: border-box;
  div{
    width: 90px;
    height: 100%;
    line-height:30px;
    text-align: center;
     background: url("../assets/images/year_n.png") no-repeat;
     background-size: 100% 100%;
     background-position: 3px 3px;
     margin-right: -15px;
     cursor:pointer;
  // border:1px solid red;
  }
}
.dataTime_l{ //现在时间
  color: #ffffff;
  position: absolute;
  text-align:center;
  float: left;
  font-size: 17px;
  // left: 250px;
  left:16%;
  font-size: 300 !important;
  top: -5px;
}
.dataTime_du{
  position: absolute;
  height: 70px;
  line-height: 70px;
  font-size: 17px;
  right: 300px;
  top: 3px;
}
.header_LOGO{
  width: 150px;
  position: absolute;
  left: 30px;
  top: 20px;
}
</style>
