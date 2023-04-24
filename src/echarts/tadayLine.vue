<template>
	 <div id="taday" style="width: 100%;height:100%;margin-top:15px;" class="datayline"></div> 
</template>

<script>
export default {
	mounted(){
		this.rows()
	},
	methods:{
		rows(){
    		var myChart = this.$echarts.init(document.getElementById('taday'));
			   myChart.setOption({
				tooltip: {
					transitionDuration:0,
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#2BDC70'
						},
						lineStyle: {
							color: "#162B5F",
						}
					}
				},
				axisLabel:{
					color:"white",
				},   
				xAxis: {
					type: 'category',
					name:'时',
					data: ['1',  '3', '5', '7', '9', '11', '13','15','17','19','21','23'],
					boundaryGap: false,
					axisLine: {
						lineStyle: {
							color: '#2BDC70'
						}
					},
				},
				yAxis: {
					type: 'value',
					name:'订单数',
					min: 0,
					// max: 40,
					interval: 10,
					color:'#2BDC70', 
					splitLine: {//分割线配置
						// show	:false,
						lineStyle: {
							color: "#162B5F",
						}
					},
					position: 'left',
					axisLine: {
						lineStyle: {
							color: '#2BDC70'
						}
					},
					// data: ['1', '4', '8', '12', '16', '20', '24'],
				},
				 grid: {
					left: "10",
					right: "40",
					bottom: "10",
					top: "50",
					containLabel: true
				},
				 axisLine: {
					lineStyle: {
						color: "white"
					}
				},
				 axisTick: {
					lineStyle: {
						// color: "white"
					},
					onZero: true
				},
				series: [//图表相应的参数
					{
						name:'订单数',
						type:'bar',
						stack: '总量',
						data:[0,0,0,11, 54, 37, 34, 56,26,3,0,0],
						itemStyle: {
							normal: {
								color: "#2BDC70",
								lineStyle: {
								color: "#2BDC70"
								}
							}
						}
					},
				],
				lineStyle:{ 
					color:'#2BDC70' //改变折线颜色
				} 

		
		})

		}
	}


}
</script>

<style lang="scss">
</style>