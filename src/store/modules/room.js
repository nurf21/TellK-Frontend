import axios from 'axios'

export default {
  state: {
    rooms: {},
    isSelected: false,
    selectedRoom: {}
  },
  mutations: {
    setRooms(state, payload) {
      state.rooms = payload
    },
    setSelect(state, payload) {
      state.isSelected = payload
    },
    setSelectedRoom(state, payload) {
      state.selectedRoom = payload
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
    },
    createRoom(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/room`, payload)
          .then(res => {
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
    },
    getSelect(state) {
      return state.isSelected
    },
    getSelectedRoom(state) {
      return state.selectedRoom
    }
  }
}
