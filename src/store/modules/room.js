import axios from 'axios'

export default {
  state: {
    rooms: {}
  },
  mutations: {
    setRooms(state, payload) {
      state.rooms = payload
    }
  },
  actions: {
    getRoomByUserId(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_BASE_URL}/room/${payload}`)
          .then(res => {
            context.commit('setRooms', res.data.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    }
  },
  getters: {
    roomList(state) {
      return state.rooms
    }
  }
}
