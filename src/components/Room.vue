<template>
  <b-container class="room">
    <div class="room-header">
      <b-row class="room-header-row">
        <b-col cols="1" class="rooms-pict" align-self="center">
          <b-img :src="url + '/' + room.user_image" class="rooms-pict" />
        </b-col>
        <b-col cols="10" align-self="center">
          <p class="room-name">{{ room.user_name }}</p>
          <p class="room-status">{{ room.status }}</p>
        </b-col>
        <b-col cols="1" align-self="center">
          <!-- <b-img :src="require('../assets/icon/Profile menu.png')" /> -->
        </b-col>
      </b-row>
    </div>
    <div id="chat-c">
      <b-container>
        <b-row v-for="(value, index) in chat" :key="index">
          <div :class="value.class" v-if="value.class === 'sender'">
            {{ value.message }}
          </div>
          <b-col v-if="value.class === 'receiver'">
            <div :class="value.class" class="float-right">
              {{ value.message }}
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container class="input-c">
      <b-row>
        <b-col cols="11">
          <b-form-input
            placeholder="Type your message..."
            v-on:keyup.enter="onSend"
            v-model="msg"
          ></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-button @click="onSend">
            <b-img :src="require('../assets/icon/Send.png')" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'Chat',
  data() {
    return {
      // room: {
      //   pict: require('../assets/img/mother.png'),
      //   name: 'Mother ❤',
      //   status: 'Online'
      // },
      url: process.env.VUE_APP_BASE_URL,
      msg: null,
      socket: io(process.env.VUE_APP_BASE_URL)
    }
  },
  methods: {
    ...mapActions(['sendMessage', 'getMessageByRoomId']),
    scrollToEnd() {
      const container = this.$el.querySelector('#chat-c')
      container.scrollTop = container.scrollHeight
    },
    onSend() {
      const payload = {
        roomId: this.room.room_id,
        userId: this.user.user_id,
        message: this.msg
      }
      this.sendMessage(payload)
      const payloadRoom = {
        roomId: this.room.room_id,
        userId: this.user.user_id
      }
      this.getMessageByRoomId(payloadRoom)
      this.scrollToEnd()
      const setData = {
        message: this.msg,
        class: 'sender',
        room: this.room.room_id
      }
      this.socket.emit('roomMessage', setData)
      this.msg = ''
    }
  },
  mounted() {
    this.scrollToEnd()
    this.socket.on('chatMessage', data => {
      this.chat.push(data)
    })
  },
  computed: {
    ...mapGetters({
      room: 'getSelectedRoom',
      chat: 'getMessage',
      user: 'getUserData'
    })
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
