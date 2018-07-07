import Vue from "vue";
import Vuex from "vuex";
import types from "./mutation-types";
import * as sysApi from '../assets/service'


Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production', 直接修改state 抛出异常
  state: {
    roomBaseInfo: null
  },
  getters: {
    roomBaseInfo:state => state.roomBaseInfo,
  },
  mutations: {
    //只能同步的函数
    [types.ROOMBASEINFO] (state, roomInfo) {
      state.roomBaseInfo = roomInfo
    }
  },
  actions: {
    //异步的函数
    setRoomBaseInfo:({commit}) => {
      // sysApi.adminList({}).then(res => {
      //   commit(types.LOAD_ADMINS, res.data);
      // })
    }
  }
})

export default store
