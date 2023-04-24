<template>
<div>
    <Top></Top>
    <div class="title">{{names}}智慧数据平台</div>
  <div class="home">
    <div class="home_l">
      <div class="home_table">
        <div class="home_table_tit1">
          <p>24小时客流分析</p>
        </div>
        <div class="home_table_cnt">
          <Zoushi @innum="innum" :marketId="marketId"></Zoushi>
        </div>
      </div>
      <div class="home_table">
        <div class="home_table_tit1">
          <p>今日检测信息</p>
        </div>
        <div class="home_table_cnt">
            <tableToday :marketId="marketId"></tableToday>
        </div>
      </div>
      <div class="home_table">
        <div class="home_table_tit1">
          <p>交易额占比</p>
        </div>
        <div class="home_table_cnt table_from">
           <rouse :marketId="marketId"></rouse>
        </div>
      </div>
    </div>
    <div class="home_c">
      <div class="home_c_bar">
        <div  class="home_c_bar_num">
          <p>实时交易笔数(笔)</p>
          <div class="home_c_num">
            <div class="home_c_num_cnt" v-for="(item, ind) in marketList1" :key="ind" v-if="ind<9" :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
              <!-- <span>{{item}}</span> -->
              <span v-if="!isNaN(item)">
                <i ref="numberItem1">0123456789</i>
              </span>
              <span class="comma" v-else>{{item}}</span>
            </div>
          </div>
        </div>

        <div class="home_c_bar_num">
          <p>实时交易重量(kg)</p>
          <div class="home_c_num">
            <div class="home_c_num_cnt" v-for="(item, ind) in marketList2" :key="ind" v-if="ind<9" :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
              <!-- <span>{{item}}</span> -->
              <span v-if="!isNaN(item)">
                <i ref="numberItem2">0123456789</i>
              </span>
              <span class="comma" v-else>{{item}}</span>
            </div>
          </div>
        </div>
        <div class="home_c_bar_num">
          <p>实时交易金额(元)</p>
          <div class="home_c_num">
            <div class="home_c_num_cnt" v-for="(item, ind) in marketList3" :key="ind" v-if="ind<9" :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }">
              <!-- <span>{{item}}</span> -->
              <span v-if="!isNaN(item)">
                <i ref="numberItem3">0123456789</i>
              </span>
              <span class="comma" v-else>{{item}}</span>
            </div>
          </div>
        </div>
         <!-- 市场数量 电子秤数 -->
        <div class="home_c_market_num">

            <div class="home_c_market_num_l">
              <img src="../assets/images/market.png" alt="" style="width:30px">
              商户数：<span>{{marketNum}}</span>
            </div>
          
            <div class="home_c_market_num_r">
              <img src="../assets/images/cheng.png" alt="" style="width:22px;height:22px">
              电子秤数：<span>{{chengNum}}</span> 
            </div>
              <div class="home_c_market_num_l">
              <img src="../assets/images/market.png" alt="" style="width:30px">
              今日客流：<span>{{personNum}}</span> 
            </div>
         </div>
      </div>
      <!-- 视频 -->
      <!-- 银河 中维-->
      <div class="home_c_bus" v-if="marketId=='1434'">
        <iframe src="" frameborder="0" style="width:100%;height:100%;border-radius:20px;overflow: hidden;"></iframe>
      </div>
      <!-- 燕庄 大华 -->
      <div class="home_c_bus" v-else ref='live'>
        <div id="playercontainer"></div>
      </div>
      <div class="home_c_line">
        <!-- <div class="home_c_line_btm"> -->
          <!-- <div class="home_table_tit1 home_table_tit">
            <p>今日检测信息</p>
          </div>
          <div class="home_table_cnt">
              <tableToday></tableToday>
          </div> -->
        <!-- </div> -->
        <div class="home_c_line_l">
            <div class="home_table_tit1">
              <p>实时交易数据</p>
            </div>
            <div class="home_table_cnt table_from" >
           <tableData :marketId="marketId"></tableData>
             
            </div>
        </div>
        <div class="home_c_line_r">
            <div class="home_table_tit1">
              <p>商品指导价</p>
            </div>
            <div class="home_table_cnt table_from">
                <shopsPrice :marketId="marketId"></shopsPrice>
            </div>
        </div>
      </div>
    </div>
    <div class="home_r">
      <div class="home_table">
        <div class="home_table_tit1">
          <p>疫情防控人员测温</p>
          
        </div>
        <div class="home_table_cnt table_from">
           <TableCheng :marketId="marketId"></TableCheng>
        </div>
      </div>
      <div class="home_table">
        <div class="home_table_tit1">
          <p>24小时交易走势图</p>
        </div>
        <div class="home_table_cnt">
          <brokenLine :marketId="marketId"></brokenLine>
        </div>
      </div>
      <div class="home_table">
        <div class="home_table_tit1">
          <p>线上市场订单</p>
        </div>
        <div class="home_table_cnt">
          <tadayLine></tadayLine>
        </div>
      </div>
    </div>
  </div>
  <!-- 公告 -->
  <div class="bottom_home">
    <div  class="notify_img">
      <!-- <img src="../assets/images/notify.png" alt=""> -->
      市场公告
    </div>
    <div class="notify_cnt">
        <vue-seamless-scroll
      :data="mydata"
      class="seamless"
      :class-option="classOption"
    >
      <p v-for="( item,index) in mydata" :key="index">
        做好新型冠状病毒感染的肺炎疫情防控工作关系到人民群众的健康和生命安全，农贸市场作为人流较为集中的民生物资供应点，是此次疫情防控的重要领域之一，区市场监管局严格按照防控工作要求，结合市场实际创新推出“农贸市场防控六条措施”，落实科室帮扶各所（分局）机制，筑牢市民“菜篮子”安全防线，全力打赢农贸市场疫情防控狙击战。

　　1.市场内禁止活禽交易、野生动物交易，销售的杀白禽类要加强索证索票。对全区43个有证农贸市场内的动物类交易活动进行监督管理，落实农贸市场举办方和经营者第一责任人，推行农贸市场 “专人驻场”，禁止城乡农贸市场活禽交易，截止目前，全局共出动检查人员720人次，检查市场各类经营户2785户次（联合检查305户次），未发现活禽交易和野生动物违规经营，做到“全覆盖、零发生、日报告”。

　　2.加强市场入口管理，尽量减少市场入口，入口都要测体温，不戴口罩不能入内。全区各市场尽量保留一个出入口，所有进场人员必须检测体温和正确佩戴口罩，做到市场人员进出必须坚守一扇门，测量体温必须不漏一个人。截止目前，区市场监管局分两批共计发放额温计66只，全区各农贸市场均已配齐。

　　3.市场经营户每天经营前必须要测体温，要戴口罩经营。对全区农贸市场实施测量体温和佩戴口罩准入经营，由农贸市场举办方在经营前做好监督测量并进行记录，全力保障安全卫生的市场经营环境，以最严格的措施和标准守护全区人民的民生供应。

　　4.加强市场环境保洁，开展场地每日消杀。区市场监管局创新工作方法，结合当前实际联系区疾控中心，开展农贸市场管理人员环境消杀培训。由区疾控中心安排就近的卫生院对属地市场管理人员进行环境消毒、疫情防控知识培训，从而保证农贸市场消杀工作的有效开展，截止目前，全区43家有证农贸市场累计开展消毒杀菌420余次。

　　5.落实志愿者上岗，配合开展市场管控工作。肺炎疫情牵动着大家的心，不少志愿者、预备役都纷纷自觉前来支援疫情防控工作。在经过岗前培训后，各志愿者在各大农贸市场协助体温监测、宣传防疫知识，引导进场人员正确佩戴口罩，从而加强人员配备，确保农贸市场疫情防控工作开展更加全面、高效。

　　6.市场入口要有防控温馨提示，宣传栏、电子屏要有疫情防控相关资料和宣传标语。全区农贸市场入口张贴、摆放防疫相关的温馨提示，市场电子显示屏每日滚动播放疫情防疫相关知识、标语以及市场相关防控措施等内容，进一步强化宣传引导。同时，发挥微信、QQ工作群作用，对全区农贸市场相关防控工作进行实时监督指导，全力打赢农贸市场疫情防控狙击战。
      </p>
      </vue-seamless-scroll>
    </div>
  </div>
</div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
import shopsPrice from './market/shopsPrice'
import rouse from "./market/rows"
import gramLine from "@/echarts/gram_lined";
import brokenLine from "./market/brokenLine";
import tableFrom from "@/echarts/table";
import Market from '../echarts/market.vue';
import tableData from './market/table_data.vue';
import tadayLine from '../echarts/tadayLine.vue';
import Bar from '../echarts/bar.vue';
import tableToday from './market/tableToday.vue';
import TableCheng from './market/tableCheng.vue';
import Top from './top.vue';
import Caipin from "./market/caipin.vue";
import Zoushi from "./market/zoushi.vue";
import _getdata from '@/commit/market';
// import orderData from '@/echarts/tadayLine';
import {PrefixZero} from '@/commit/history';
import vueSeamlessScroll from "vue-seamless-scroll";

import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  import videoPlayer from 'vue-video-player'
  Vue.use(videoPlayer)
  import 'videojs-flash'
export default {
  name: "Home",
  components: {
      videoPlayer
    },
  data(){
    return {
       videoSrc: '',
       marketId:'',
        marketList1:['0', '0', '0', '5', '0'],
        marketList2:['0', '2','0', '5', '4', '3', '0', '0'],
        marketList3:['0', '0', '0', '5', '0','3'],
        partype:'',
        chengNum:0,
        marketNum:0,
        interval:null,
        mydata:[1],
         personNum :0,
         names:'',
         player:null
    }
  },
  components: {
    rouse,
    gramLine,
    brokenLine,
    tableFrom,
    Market,
    tableData,
    tadayLine,
    Bar,
    tableToday,
    TableCheng,
    Top,
    Caipin,
    Zoushi,
    shopsPrice,
    vueSeamlessScroll
  },
  mounted(){
    this.getshebeiid()
    this.getname()
     this.getmakertBigDataByNow()
    this.interval = window.setInterval(() => {
      setTimeout(this.getmakertBigDataByNow(), 0);
    }, 15000);
      // console.log(this.marketId)
    if(this.marketId==1434){
    window.frames[0].location = "http://hhc.zskjnm.com:8088/index.html"
    }
    // else{
    //   this.getshebeiid()
    // }
    // if(this.marketId==1418){
    // // window.frames[0].location = "http://127.0.0.1:5500/hls.html"
    // this.getVideoFn()
    // }
  },
  beforeMount() {
    this.marketId = localStorage.getItem('marketid')
    if(this.marketId!=null&&this.marketId!=''){
      this.$router.push({ path: this.$router.history.current.path, query: { id: this.marketId } });
    }else{
      this.open();
    }
    // var query = this.$route.query;
    // if (!query.id) {
    //   this.open();
    // } else {
    //   this.marketId = query.id;
    // }
  },
  beforeDestroy() {
    clearInterval(this.interval);
     this.interval = null;
    // console.log("beforDestroy");
  },
   computed:{
    classOption() {
      return {
        step: 1, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: false, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 55, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 0, // 单步运动停止的时间(默认值1000ms)
        
      };
    },
  },
  methods:{
    getVideoFn(){
            this.player = cyberplayer("playercontainer").setup({
               width: '100%', // 宽度，也可以支持百分比（不过父元素宽度要有）
        height: '100%', // 高度，也可以支持百分比
        title: 'demo示例', // 标题
        isLive: true, // 必须设置，表明是直播视频
        // file: "rtmp://121.43.126.231:12966/live/28de595627d6d45c603446b78980f65790b4ee049a45e383", // //您的视频源的地址（目前是乐橙示例播放地址）
        file:this.urls,
        image: '', // 预览图
        autostart: true, // 是否自动播放
        stretching: "uniform", // 拉伸设置
        repeat: false, // 是否重复播放
        volume: 0, // 音量，注：仅当用户同意、网站由用户激活或媒体无声时允许自动播放
        controls: false, // 是否显示控制栏
        hls: {
            reconnecttime: 5 // hls直播重连间隔秒数
        },
        ak: "7a223f32e0ac4e84ab1553b1fdcb7b04"
            });
        },
    open() {
      this.$prompt("请输入市场编号", "提示", {
        confirmButtonText: "确定",
        // cancelButtonText: "取消",
        inputPattern: "",
        inputErrorMessage: "内容不能为空",
        showClose:false,
        distinguishCancelAndClose:false,
        showCancelButton:false,
        closeOnPressEscape:false,
        closeOnClickModal:false
      })
        .then(({ value }) => {
          let path = this.$router.history.current.path;
          this.$router.push({ path: path, query: { id: value } });
          this.$message({
            type: "success",
            message: "市场编号设置成功"
          });
          // ipc.send("indata", value);
          if(value!=''&&value!=null){
            localStorage.setItem('marketid',value)
          }
          this.$router.go(0)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    innum(data){
      console.log(data,"jdhfhsfdjks")
      this.personNum =data
    },
    // 获取市场名称
    getname(){
      var that = this;
      var data = {
        id:that.marketId
      }
      _getdata.scmc(data).then(res=>{
        // console.log(res)
        if(res.data.return_code==0){
          that.names = res.data.datas.agename
        }
      })
    },
     getmakertBigDataByNow(){ //交易量、数、额
    var that = this;
      var data = {
        id:that.marketId
        // id:1400
      }
      _getdata.getmakertBigDataByNow(data).then(res =>{
        // console.log(res)
          if(res.data.return_code == 0){

            // var str = parseInt(res.data.datas.curDayCnt).toString();
            if(parseInt(res.data.datas.curDayCnt).toString() < 10000){    //实时交易笔数(笔)
              var str = PrefixZero(parseInt(res.data.datas.curDayCnt).toString(),5)
            }else{
              var str = parseInt(res.data.datas.curDayCnt+1).toString();
            }
            if(parseInt(res.data.datas.curDayWeight).toString() < 10000){ //实时交易重量(kg)
              var curDayCnt = PrefixZero(parseInt(res.data.datas.curDayWeight).toString(),5)
            }else{
              var curDayCnt = parseInt(res.data.datas.curDayWeight).toString();
            }
            if(parseInt(res.data.datas.curDayAmt).toString() < 10000){//实时交易金额(元)
              var curDayWeight = PrefixZero(parseInt(res.data.datas.curDayAmt).toString(),5)
            }else{
              var curDayWeight = parseInt(res.data.datas.curDayAmt).toString();
            }
            
            var arr=str.split("");
            var curDayCnt=curDayCnt.split("");
            var curDayWeight=curDayWeight.split("");
            that.marketList1 = arr
            that.marketList2 = curDayCnt
            that.marketList3 = curDayWeight
            that.marketNum = res.data.datas.sellercnt
            that.chengNum = res.data.datas.tercnt
            that.setNumberTransform () 
            that.setNumberTransform2 ()
            that.setNumberTransform3 ()
          // that.partype = res.data.datas
          
        }
      })
    },
 // 设置文字滚动
   setNumberTransform () {
    //  /实时交易数
    const numberItems = this.$refs.numberItem1 // 拿到数字的ref，计算元素数量
    var numberArr = this.marketList1.filter(item => !isNaN(item))
    // console.log(numberArr)
    // 结合CSS 对数字字符进行滚动,显示订单数量
    for (let index = 0; index < numberItems.length; index++) {
      const elem = numberItems[index]
      elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
    }
   },
   setNumberTransform2 () {// 本月交易量
    const numberItems = this.$refs.numberItem2 // 拿到数字的ref，计算元素数量
    var numberArr = this.marketList2.filter(item => !isNaN(item))
    // console.log(numberArr)
    // 结合CSS 对数字字符进行滚动,显示订单数量
    for (let index = 0; index < numberItems.length; index++) {
      const elem = numberItems[index]
      elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
    }
    
   }, 
   setNumberTransform3 () {// 本月交易量
    const numberItems = this.$refs.numberItem3 // 拿到数字的ref，计算元素数量
    var numberArr = this.marketList3.filter(item => !isNaN(item))
    // console.log(numberArr)
    // 结合CSS 对数字字符进行滚动,显示订单数量
    for (let index = 0; index < numberItems.length; index++) {
      const elem = numberItems[index]
      elem.style.transform = `translate(-50%, -${numberArr[index] * 10}%)`
    }
    
   },
    // 处理总订单数字
   toOrderNum(num) {
    num = num.toString()
    // 把订单数变成字符串
    if (num.length < 8) {
    num = '0' + num // 如未满八位数，添加"0"补位
    this.toOrderNum(num) // 递归添加"0"补位
    } else if (num.length === 8) {
    // 订单数中加入逗号
    num = num.slice(0, 2) + ',' + num.slice(2, 5) + ',' + num.slice(5, 8)
    this.orderNum = num.split('') // 将其便变成数据，渲染至滚动数组
    } else {
    // 订单总量数字超过八位显示异常
    this.$message.warning('订单总量数字过大，显示异常，请联系客服')
    }
   },
// 获取设备号
    getshebeiid(){
      var that = this;
      var data = {
         marketId:that.marketId
      }
      _getdata.getshebei(data).then(res=>{
        // console.log(res)
        if(res.data.return_code==0){
          that.urls = res.data.datas.chanel1
          that.getVideoFn()
        }
      })
    },
  }
};
</script>
<style lang="scss" >
.seamless{
  width: 100%;
  overflow: hidden;
}
.bottom_home{
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  overflow: hidden;
  .notify_img{
    padding: 0 10px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background: #A88312;
    text-align: center;     
    font-size: 20px;
    border-radius: 5px;
    font-weight: 500;
  }
  .notify_cnt{
    width: 94%;
p{
    color:#fff;
    // width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    white-space: nowrap;
    background: rgba(0,0,0,0.4);
    letter-spacing:3px;
  }
  }
  
}

.title{
  position: absolute;
  top:0;
  left:0;
  z-index: 100;
  color:white;
  font-size:26px;
  width:100%;
  text-align:center;
  line-height: 85px;
   font-weight: bold;
    animation: cpbottom 0.7s linear forwards;
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
.home {
  width: 100%;
  height: 90%;
  display: flex;
  padding: 0 15px;
  box-sizing: border-box;
  justify-content: space-between;
  color: #ffffff;
  position: absolute;
  left:0;
  // top:9.5%;
  top:80px;
  z-index: 100;
  // border: 1px solid red;
}
/* // 整体三部分 */
.home_l {
  width: 26%;
  height: 100%;
  animation: cpbottoma 0.8s linear forwards;
  box-sizing: border-box;
}
@keyframes cpbottoma {
      from {
        margin-top:300px;
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
.home_c {
  flex: 1;
  // width: 44%;
  height: 100%;
  // border:1px solid #ffffff;
  padding: 0 15px;

}
@keyframes cprighta {
      from {
        margin-top:300px;
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
.home_r {
  width: 26%;
  height: 100%;
  animation: cprighta 0.8s linear forwards;
  // border:1px solid pink; 
}
/* // 左右6个位置的高度 */
.home_table {
  // border: 1px solid #4C6DA9;
  // background: #2E4267;
  width: 100%;
  height: 31.5%;
  margin-bottom: 3%;
}
/* // 中间部分 */
.home_c_bar {
  width: 100%;
  height: 14%;
  // border: 1px solid #4C6DA9; 
  /* // background: #2E4267; */
  display: flex;
  color: #ffffff;
  justify-content: space-around;
  flex-wrap: wrap;
}
.home_c_bar .home_c_bar_num {
  max-width: 33%;
  height: 60%;
  width: 33%;
  text-align: center;
  margin: auto;
  // margin-bottom: 10px;
  // border: 1px solid red;
  .home_c_num{
    display: flex;
    align-items: center;
     justify-content: center;
    .home_c_num_cnt{
      width: 20px;
      height: 30px;
      margin-left: 10px;
      // background-color: #5CBDFC;
      background-image: url('../assets/images/num.png');
      background-size: 100% 100%;
      line-height: 30px;
    }
    
  }
  p{
      margin: 10px 0 !important;
      font-weight: 600;
    }
}
// 数字滚动
// .home_c_num_cnt span {
//  position: absolute;
//  top: 10px;
//  left: 50%;
//  transform: translateX(-50%);
//  letter-spacing: 10px;
// }
// 市场数电子秤数
.home_c_market_num{
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-weight: 600;
  // border: 1px solid red;
  .home_c_market_num_l ,.home_c_market_num_r{
    display: flex;
    align-items: center;
      &>img{
        margin:5px 10px;
      }
      &>span{
        color: #0DE59C;
      }
  }
 

}
.home_c_bus {
  width: 100%;
  height: 51%;
  background: url("../assets/images/bg_border.png") no-repeat;
  background-size: 100% 100%;
  // background: #2E4267;
  margin-bottom: 15px;
  padding: 10px 15px;
  box-sizing: border-box;
}
#playercontainer{
  width:100%;
  height:100%;
}
.home_c_line {
  width: 100%;
  height: 31%;
  display: flex;
  justify-content: space-between;
}
// 中间底部
.home_c_line_r,.home_c_line_l{
  width: 49%;
  height: 100%;
}
/* //中间 底部 */
.home_c_line .home_c_line_btm {
  width: 100%;
  height: 100%;
  border: 1px solid #4C6DA9;
}
// 标题
.home_table_tit1 {
  width: 70%;
  height: 10%;
  background: url("../assets/images/titlemodel.png") no-repeat;
  margin: 0px 0px 15px 0px;
  background-size: 100% 100%;
  // margin-top: 10px;
  > p {
    // color:white;
    margin: 0px 0 0 80px;
    transition: all 1.5s ease;
    color: #fff;
  }
}
.home_table_tit{
  width: 40%!important;
  margin-bottom: 10px;
}
// 内容
.home_table_cnt {
  width: 100%;
  height: 84%;
  // border: 1px solid red;
  background: url("../assets/images/bg_border.png") no-repeat;
  background-size: 100% 100%;
}
// b表格
.table_from{
  padding: 10px;
  box-sizing: border-box;
}
// 数子滚动
.number-item:last-child {
  margin-right: 0;
}
.number-item {
  // width: 41px;
  // height: 75px;
  list-style: none;
  margin-right: 5px;
  border-radius:4px;
  // border:1px solid red;
  // border:1px solid rgba(221,221,221,1);
  & > span {
   position: relative;
   display: inline-block;
   margin-right: 10px;
   width: 100%;
   height: 100%;
   writing-mode: vertical-rl;
   text-orientation: upright;
   overflow: hidden;
   & > i {
    font-style: normal;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translate(-50%,0);
    transition: transform 1s ease-in-out;
    letter-spacing: 10px;
   }
  }
 }
//  .box-item {
//   position: relative;
//   height: 100px;
//   font-size: 54px;
//   line-height: 41px;
//   text-align: center;
//   list-style: none;
//   color: #2D7CFF;
//   writing-mode: vertical-lr;
//   text-orientation: upright;
//   /*文字禁止编辑*/
//   -moz-user-select: none; /*火狐*/
//   -webkit-user-select: none; /*webkit浏览器*/
//   -ms-user-select: none; /*IE10*/
//   -khtml-user-select: none; /*早期浏览器*/
//   user-select: none;
//   /* overflow: hidden; */
//  }
 /* 默认逗号设置 */
//  .mark-item {
//   width: 10px;
//   height: 100px;
//   margin-right: 5px;
//   line-height: 10px;
//   font-size: 48px;
//   position: relative;
//   & > span {
//    position: absolute;
//    width: 100%;
//    bottom: 0;
//    writing-mode: vertical-rl;
//    text-orientation: upright;
//   }
//  }
</style>
