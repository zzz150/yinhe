<template>
  <div class="Table">
      <div class="table_a normal_table" v-for="(item,index) in normal" :key="index" v-if="normalShow">
          <div class="table_b">
              <img :src="item.img" alt="" >
          </div>
          <div class="table_c">{{item.temperature}}℃</div>
          <!-- <div class="table_c">{{item.age}}岁</div> -->
          <!-- <div class="table_c">{{item.sex}}</div> -->
          <div class="table_c">{{item.createdate}}</div>
      </div>
      <vue-seamless-scroll
      :data="mydata"
      class="seamless-warp"
      :class-option="classOption"
    >
      <div class="table_top_photo"  v-for="(item,index) in mydata" :key="index">
         <div class="table_b">
              <img :src="item.img" alt="" >
          </div>
        <div class="table_a">
         
          <div class="table_c">{{item.temperature}}℃</div>
          <!-- <div class="table_c">{{item.age}}岁</div> -->
          <!-- <div class="table_c">{{item.sex}}</div> -->
          <div class="table_c">{{item.createdate}}</div>
      </div>
      </div>
      
      </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import _getdata from '@/commit/market'
export default {
    components: {
    vueSeamlessScroll
  },
  props: ["marketId"],
  data() {
    return {
        mydata:[
            {
                imgs:require("../../assets/images/qiu4.png"),
                tec:"36.5",
                age:"22",
                sex:"女",
                data:"2020-12-8"
            },{
                imgs:require("../../assets/images/qiu4.png"),
                tec:"36.5",
                age:"22",
                sex:"女",
                data:"2020-12-8"
            },{
                imgs:require("../../assets/images/qiu4.png"),
                tec:"36.5",
                age:"22",
                sex:"女",
                data:"2020-12-8"
            }

        ],
        interval:null,
        // 不正常温度
        normal:[],
        normalShow:false,
        list:[]
    };
  },
  mounted(){
    // if(this.marketId==1434){
      this.MeasureDataReceive()
    this.interval = window.setInterval(() => {
      setTimeout( this.MeasureDataReceive(), 0);
    }, 5000);
    // }
   
  },
   beforeDestroy() {
    clearInterval(this.interval);
     this.interval = null;
     this.mydata = []
    console.log("beforDestroy");
  },
  computed:{
    classOption() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 55, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
        
      };
    },
  },
  methods:{
     MeasureDataReceive(){
      var that = this;
      var data = {
        id:that.marketId,
        top:10,
      }
      _getdata.MeasureDataReceive(data).then(res =>{
        // console.log(res,"测温")
        if(res.data.return_code == 0){
          var normal = []
          res.data.datas.list.forEach((r,index) => {
            // console.log(r)
              if(r.normal == '0'){
                normal.push(r)
                // console.log(normal,'1111')
                that.list.push(r)
                // console.log(that.list,'2222')
                that.list.forEach(element => {
                //   // console.log(element.id)
                  normal.forEach(el => {
                    if(element.id==el.id){
                      console.log(normal,'22222')
                      // console.log(element.id,el.id)
                      normal.splice(el.id,1)
                      console.log(normal,'111111')
                      // var normal=[]
                      // normal.push(el)
                //       console.log(normal)
                //       // console.log('相同')
                // that.normal = normal
                // console.log(that.normal,'111')
                // that.normal=[]
                // that.normal.push(el)
                // console.log(that.normal)
                    }

// console.log(that.normal,'111')
                    // that.normal = normal
                    // that.normalShow = true
                  });
                // that.normalShow = true

                });
                // console.log(that.normal,'222')
                // that.normal = normal
                // that.normalShow = true
              }else{
                that.mydata.push(r) 
              }
            })
            
          if(that.mydata.length >= 20){
            that.mydata.splice(0,11)
          }
        }
      })
     
      if(that.normal != []){
        setTimeout(function(){
          
          that.normalShow = false
          that.normal = []
        },10)
      }
        
    },
  }
};
</script>
<style scoped lang='scss'>
// @import '../../assets/css/echarts.scss';
.Table {
  // border: 2px solid #3486da;
  color: white;
  font-weight: 500;
  width: 99%;
  height:100%;
  line-height: 100%;
  overflow: hidden;
  position: relative;

   .table_b{
          width:45px;
          height:45px;
          border-radius:50%;
          overflow: hidden;
          img{
              width:100%;
              height:100%;
          }
      }
  .table_a{
      width:90%;
      height:40px;
      margin-left:2%;
      background:#3a6eb4;
      border-radius:30px;
      // margin-bottom:3%;
      display:flex;
      align-items: center;
      justify-content: space-around;
     
      @-webkit-keyframes fadeIn {
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
      .table_c{
          color:white;
          font-size:17px;
        //   -webkit-animation-name: fadeIn;
        //   -webkit-animation-duration: 1s;
      }
      
  }
  .normal_table{
    background:red !important;
    position: absolute;
    top: 0;
    z-index: 10;
    height: 45px ;
  }
}
.table_top_photo{
  width:100%;
  height:55px;
  display: flex;
  align-items: center;
  
  // border: 1px solid red;
}
</style>