// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
Vue.config.productionTip = false
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import ElementUI from 'element-ui'
import element-ui/lib/theme-chalk/index.css Vue.use(ElementUI)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
