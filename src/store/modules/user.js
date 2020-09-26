import axios from 'axios'

export default {
  state: {
    searchResult: {}
  },
  mutations: {
    setSearch(state, payload) {
      state.searchResult = payload
    }
  },
  actions: {
    patchUserImage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/user/update/image/${payload.id}`,
            payload.form
          )
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    patchUserProfile(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/user/update/profile/${payload.id}`,
            payload.form
          )
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    patchLocation(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(
            `${process.env.VUE_APP_BASE_URL}/user/update/location/${payload.id}`,
            payload.form
          )
          .then(res => {
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    getUserByEmail(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/user/search/${payload}`)
          .then(res => {
            context.commit('setSearch', res.data.data[0])
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  },
  getters: {
    getSearchResult(state) {
      return state.searchResult
    }
  }
}
