import axios from 'axios'

export default {
  state: {
    message: {}
  },
  mutations: {
    setMessage(state, payload) {
      state.message = payload
    },
    pushMessage(state, payload) {
      state.message.push(payload)
    }
  },
  actions: {
    getMessageByRoomId(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(
            `${process.env.VUE_APP_BASE_URL}/message?roomId=${payload.roomId}&userId=${payload.userId}`
          )
          .then(res => {
            context.commit('setMessage', res.data.data)
            resolve(res.data)
          })
          .catch(err => {
            reject(err.response)
          })
      })
    },
    sendMessage(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_BASE_URL}/message`, payload)
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
    getMessage(state) {
      return state.message
    }
  }
}
