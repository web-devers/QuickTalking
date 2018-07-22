// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './mint-ui.js'
import './socket-io.js'

Vue.config.productionTip = false
//关于axios配置
axios.interceptors.request.use(function(config){
//配置发送请求的信息
	// store.dispatch('showLoading')
	return config;
},function(error){
	return Promise.reject(error);
});
axios.interceptors.response.use(function(response){
//配置请求返回的信息
	// store.dispatch('hideLoading')
	return response;
},function(error){
	return Promise.reject(error);
});
// axios.defaults.baseURL='http://localhost:8082/';//配置请求的根路径
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';//设置post头部信息
// axios.defaults.headers.post['enctype']='application/x-www-form-urlencoded';

Vue.prototype.$http=axios;//把axios对象挂到原型上
// Vue.prototype.$qs = qs;
Vue.prototype.$jsonp=function getData(data){
	return data
}

require('./assets/css/reset.css'); 	//全局引入

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
