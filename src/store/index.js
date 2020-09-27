import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Auth from './modules/auth'
import User from './modules/user'
import Contact from './modules/contact'
import Room from './modules/room'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    User,
    Contact,
    Room
  },
  plugins: [
    createPersistedState({
      path: ['Auth.user'],
      storage: window.sessionStorage
    })
  ]
})
