import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/auth'
import User from './modules/user'
import Contact from './modules/contact'
import Room from './modules/room'
import Message from './modules/message'
import Group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    User,
    Contact,
    Room,
    Message,
    Group
  },
  plugins: [
    createPersistedState({
      path: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
