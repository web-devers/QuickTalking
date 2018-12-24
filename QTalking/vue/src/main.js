// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/'
import './mint-ui.js'
import './socket-io.js'
// import './swipe.js'
import { getCookie } from './utils/cookie'


Vue.config.productionTip = false
//关于axios配置
axios.interceptors.request.use(function(config){
//配置发送请求的信息
	store.dispatch('showLoading');
	const _session=getCookie('Qsession');
	if(_session){
		if (!config.headers) {
	      	config.headers = {
	        session: _session
	      }
	    } else {
	      	config.headers.session = _session
	    }
	}
	console.log('con',config.headers.session);
	return config;
},function(error){
	console.log(err);
	return Promise.reject(error);
});
axios.interceptors.response.use(function(response){
//配置请求返回的信息
	store.dispatch('hideLoading')
	return response;
},function(error){
	return Promise.reject(error);
});
// axios.defaults.baseURL='http://47.106.102.92:808';//配置请求的根路径
axios.defaults.baseURL='http://192.168.101.9:8088';//配置请求的根路径
axios.defaults.withCredentials=true;
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';//设置post头部信息
// axios.defaults.headers.post['enctype']='application/x-www-form-urlencoded';
Vue.prototype.$http=axios;//把axios对象挂到原型上
// Vue.prototype.$qs = qs;
Vue.prototype.$jsonp=function getData(data){
	return data
}

require('./assets/css/reset.css'); 	//全局引入
require('swiper/dist/css/swiper.css')
import "./assets/css/border.css";


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
