import axios from 'axios'

export default {
  state: {
    groups: {}
  },
  mutations: {
    setGroups(state, payload) {
      state.groups = payload
    }
  },
  actions: {
    getAllGroups(context) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/group`)
          .then(res => {
            context.commit('setGroups', res.data.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  },
  getters: {
    getGroups(state) {
      return state.groups
    }
  }
}
