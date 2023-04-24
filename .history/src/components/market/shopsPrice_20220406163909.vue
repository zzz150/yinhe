<template>
<div class="shipjdsf">

  <vue-seamless-scroll
    :data="mydata"
    class="seamless-warp"
    :class-option="classOption"
>
  <div class="shops_price">
      <ul v-for="(item,index) in mydata" :key="index">
          <li>{{item.name}}</li>
          <li>{{item.price || ''}}元/kg</li>
          <li>持平--</li>
      </ul>
  </div>
  </vue-seamless-scroll>
</div>

</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  props: ["marketId"],
    data(){
        return {
              mydata:[
                  {
                  name: '菠菜',
                  price:'6',
                  sun:1
                },
                {
                  name: '芹菜',
                  price:'6',
                  sun:1
                },
                {
                  name: '大白菜',
                  price:'7',
                  sun:1
                },
                {
                  name: '油菜',
                  price:'8',
                  sun:1
                },{
                  name: '黄瓜',
                  price:'10',
                  sun:1
                },
                {
                  name: '冬瓜',
                  price:'8',
                  sun:1
                },{
                  name: '白萝卜',
                  price:'4',
                  sun:1
                },{
                  name: '胡萝卜',
                  price:'6',
                  sun:1
                },{
                  name: '茄子',
                  price:'12',
                  sun:1
                },{
                  name: '西红柿',
                  price:'10',
                  sun:1
                },{
                  name: '土豆',
                  price:'6',
                  sun:1
                },{
                  name: '青椒',
                  price:'16',
                  sun:1
                },{
                  name: '尖椒',
                  price:'16',
                  sun:1
                },{
                  name: '包菜',
                  price:'6',
                  sun:1
                },{
                  name: '莴笋',
                  price:'8',
                  sun:1
                },{
                  name: '芸豆角',
                  price:'20',
                  sun:1
                },{
                  name: '长豆角',
                  price:'20',
                  sun:1
                },{
                  name: '洋葱',
                  price:'6',
                  sun:1
                },{
                  name: '蒜苔',
                  price:'14',
                  sun:1
                },{
                  name: '白花菜',
                  price:'10',
                  sun:1
                },{
                  name: '大葱',
                  price:'12',
                  sun:1
                },{
                  name: '大蒜',
                  price:'12',
                  sun:1
                },{
                  name: '生姜',
                  price:'12',
                  sun:1
                },{
                  name: '韭菜',
                  price:'12',
                  sun:1
                },
              ]  
        }
    },
 components: {
    vueSeamlessScroll
  },
   computed:{
    classOption() {
      return {
        step: 0.4, // 数值越大速度滚动越快
        limitMoveNum: 1, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 54, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
}
</script>

<style lang="scss" scoped>
.shipjdsf{
    width:100%;height:100%;box-sizing: border-box;
    overflow: hidden;
    font-size: 14px;
}
.seamless-warp{
    width: 100%;
  // height: 100%;
  overflow: hidden;
}
.shops_price{
    width: 100%;
    height:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    box-sizing: border-box;
    ul{
        list-style: none;
        margin: 0;  
        padding: 0;
        border-radius: 9px;
        border: 1px solid #ffffff;
        display: flex;
        width: 48%;
        height: 40px;
        align-items: center;
        justify-content: space-between;
        align-items: center;
        padding: 0 5px;
        box-sizing: border-box;
        margin-bottom: 14px;
        
        li{
            overflow: hidden;
            white-space:nowrap;
        }
    }
}
</style>