import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'
import Home from '@/view/home'
import CreateRoom from '@/view/create-room'
import GameRoom from '@/view/game-main'
import ComeRoom from '@/view/come-room'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/create-room',
      name: 'create-room',
      component: CreateRoom
    },
    {
      path: '/come-room',
      name: 'come-room',
      component: ComeRoom
    },
    {
      path: '/game-room',
      name: 'game-room',
      component: GameRoom
    }
  ]
})
