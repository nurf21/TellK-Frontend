<template>
  <b-sidebar
    id="sidebar-mobile"
    shadow
    backdrop
    width="500px"
    class="mobile-chat"
  >
    <div class="room-header">
      <b-row class="room-header-row">
        <b-col
          cols="3"
          class="rooms-pict"
          align-self="center"
          v-if="room.user_image"
        >
          <b-img :src="url + '/' + room.user_image" class="rooms-pict" />
        </b-col>
        <b-col cols="6" align-self="center" class="room-header-info">
          <p class="room-name">{{ room.user_name }}</p>
          <p class="room-status mt-2" v-if="room.user_activity === 0">
            Offline
          </p>
          <p class="room-status mt-2" v-if="room.user_activity === 1">
            Online
          </p>
        </b-col>
        <b-col
          cols="1"
          align-self="center"
          v-b-toggle.sidebar-info
          @click="onDetail()"
          v-if="room.user_image"
        >
          <b-img :src="require('../assets/icon/Profile menu.png')" />
        </b-col>
      </b-row>
    </div>
    <div id="chat-c">
      <b-container>
        <b-row v-for="(value, index) in chat" :key="index">
          <b-col
            cols="11"
            v-if="!room.user_image && value.class === 'sender'"
            class="sender-name"
          >
            {{ value.user_name }}
          </b-col>
          <div :class="value.class" v-if="value.class === 'sender'">
            {{ value.message }}
          </div>
          <b-col
            v-if="value.class === 'sender'"
            class="time-sender"
            align-self="center"
          >
            {{ value.message_created_at }}
          </b-col>
          <b-col v-if="value.class === 'receiver'" style="display: flex;">
            <b-col
              v-if="value.class === 'receiver'"
              class="time-receiver"
              align-self="center"
            >
              {{ value.message_created_at }}
            </b-col>
            <div :class="value.class" class="float-right">
              {{ value.message }}
            </div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container class="input-c">
      <b-row>
        <b-col cols="10">
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
  </b-sidebar>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import io from 'socket.io-client'
import moment from 'moment'

export default {
  name: 'Chat',
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL,
      msg: null,
      socket: io(process.env.VUE_APP_BASE_URL)
    }
  },
  methods: {
    ...mapActions([
      'sendMessage',
      'getMessageByRoomId',
      'getRoomByUserId',
      'getAllGroups'
    ]),
    ...mapMutations(['setContactInfo']),
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
      this.getMessageByRoomId(payloadRoom).then(result => {
        console.log(result.msg)
        this.scrollToEnd()
        this.getRoomByUserId(this.user.user_id)
        this.getAllGroups()
      })
      const setData = {
        message: this.msg,
        class: 'sender',
        message_created_at: moment().format('MMMM Do YYYY, h:mm a'),
        room: this.room.room_id,
        user: this.room.user_id,
        name: this.user.user_name
      }
      this.socket.emit('roomMessage', setData)
      this.msg = ''
    },
    onDetail() {
      this.setContactInfo(
        this.contacts.filter(value => value.user_id === this.room.user_id)[0]
      )
    }
  },
  mounted() {
    this.scrollToEnd()
  },
  computed: {
    ...mapGetters({
      room: 'getSelectedRoom',
      rooms: 'roomList',
      chat: 'getMessage',
      user: 'getUserData',
      contacts: 'contactList'
    })
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
