import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
// Vue.use(VueSocketio, socketio('http://localhost:8087'));//与服务端链接http://xxx.xxx,xx,xxx:xxxx
Vue.use(VueSocketio, socketio('http://192.168.31.177:808'));//与服务端链接http://xxx.xxx,xx,xxx:xxxx