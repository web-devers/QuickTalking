import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Chatroom from '@/components/Chatroom/Chatroom.vue'
import Photo from '@/components/Photo/Photo.vue'
import UploadImg from '@/components/UploadImg/UploadImg.vue'
import Cave from '@/components/Cave/Cave.vue'
import Star from '@/components/starSign/starSign.vue'
import Dict from '@/components/Dict/Dict'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/Chatroom:name',
      name: 'Chatroom',
      component: Chatroom
    },
    {
      path: '/Photo:name',
      name: 'Photo',
      component: Photo
    },
    {
      path: '/Picture:name',
      name: 'UploadImg',
      component: UploadImg
    },
    {
      path: '/Cave:name',
      name: 'Cave',
      component: Cave
    },
    {
      path: '/Star:name',
      name: 'Star',
      component: Star
    },
    {
      path: '/Dic:name',
      name: 'Dict',
      component: Dict
    }
  ]
})
