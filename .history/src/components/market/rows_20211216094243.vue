<template>
  <!-- <div>   -->
	<div id="main" style="width: 480px;height:250px;"></div>
  <!-- </div> -->
</template>

<script>
import _getdata from '@/commit/market'
export default {
	data(){
		return {
			total:100,
			partype:[],
			nameList:[],
			allNum:0
		}
	},
	mounted(){
		this.parTypeNam();
	},
	methods:{
		parTypeNam(){
      var that = this;
      var data = {
        id:1434
      }
      _getdata.getMonthdatabyTypeName(data).then(res =>{
        if(res.data.return_code == 0){
          that.partype = res.data.datas
		  var name = []
		  
          that.partype.forEach(res => {
			name.push(res.name)
			that.allNum += res.value
		  })
		  that.allNum = Math.round(that.allNum*100)/100
		//   console.log("交易额",that.allNum)
          that.nameList = name
          that.rows()
        }
      })
    },
		rows(){
    		var myChart = this.$echarts.init(document.getElementById('main'));
			   myChart.setOption({
				title:{
					text:'交易总计',
					x:'center',
					y:'center',
					top:'130',
					textStyle:{
						color:'#ffffff',
						fontSize:17	
					}
				},
			graphic:{
				type:'text',
				left:'center',
				top:100,
				style:{
					text:this.allNum,
					fill:'#fff',
					width:110,
					height:30,
					fontSize:20
				}	
			},
			emphasis: {//中间文字显示
                show: false,
            },
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					left: 10,
					top:10,
					data:this.nameList,
					textStyle: {
						color: "#fff"
					}
				},
				series : [
					{
						name:'交易占比',
						type:'pie',//玫瑰图
						radius : [50, 80],//【放大的倍数】
						minAngle: 20,
						// center : ['75%', '50%'],
						// roseType : 'area',
						backgroundColor: '#2c343c',
						avoidLabelOverlap: false,
						 color:["#D9C701",'#F38051',"#29A0F7",'#E7536B','#2bdc70'],
						data:this.partype,	
					}
    			]
			})
			
		}
	}
	 
}
</script>

<style>

</style>