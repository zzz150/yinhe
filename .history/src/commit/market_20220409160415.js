import axios from "axios";
// const url = "http://hhc.zskjnm.com/"
// const url = "http://36.99.43.101/"
const url = "http://192.168.0.112/"

const getdata = {
    getMonthdatabyTypeName(data) { //热销菜品排名Top5
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/Trade_main/getMonthdatabyTypeName',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	get24liu(data) { //24小时客流分析
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/PsfDataReceive',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	getcode(data) { //获取验证码
		return new Promise((resolve, reject) => {
			axios({
				url: 'http://192.168.0.112/census/SmsSerivce',
				methods: "post",
				data: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	get24total(data) { //24小时交易走势图
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/Trade_main/get24total',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	getNowDataInfo(data) { //实时交易走势图
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/Trade_main/getNowDataInfo',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	getMonthdatabyTypeNametopnum (data) { //大区商品TOP5  id  top（5）
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/Trade_main/getMonthdatabyTypeNametopnum',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
    today(data) { //天气
		return new Promise((resolve, reject) => {
			axios({
				url: 'http://wthrcdn.etouch.cn/weather_mini',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	getmakertBigDataByNow (data) { //市场实时数据
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/Trade_main/getmakertBigDataByNow',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	getcheckinfo (data) { //获取快检数据
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/Trade_main/getcheckinfo',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	getDaytop10 (data) { //获取销售量前10商户
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/Trade_main/getDaytop10',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	MeasureDataReceive (data) { //获取测温数据 id  28  top(10)
		return new Promise((resolve, reject) => {
			axios({
				url: url+'census/MeasureDataReceive',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	getrecord (data) { //获取测温系统数据
		return new Promise((resolve, reject) => {
			axios({
				url: 'http://hhc.zskjnm.com/census/MeasureDataReceive',
				methods: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	scmc(data) { /// Trade_MainTableNext/scmc //市场名称
		return new Promise((resolve, reject) => {
			axios({
				url: url+'sctv/Trade_MainTableNext/scmc',
				method: "get",
				params: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
	// 获取设备号
	getshebei(data){
		return new Promise((resolve, reject) => {
			axios({
				url: url+'merchant/video/rtmp',
				method: "post",
				data: data,
			}).then((res) => {
				return resolve(res)
			}).catch(error => {
				console.log(error)
			})
		})
	},
}

export default getdata