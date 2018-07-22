import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chatroom from '@/components/Chatroom/Chatroom.vue'
import Photo from '@/components/Photo/Photo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Chatroom:name',
      name: 'Chatroom',
      component: Chatroom
    },
    {
      path: '/Photo',
      name: 'Photo',
      component: Photo
    }
  ]
})
