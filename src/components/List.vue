<template>
  <b-container style="padding: 0">
    <b-row class="list-header">
      <b-col cols="10" align-self="center"><p>TellK</p></b-col>
      <b-col cols="2" align-self="center">
        <img src="@/assets/icon/Menu.png" id="pop-burger" alt="toggle-menu" />
      </b-col>
      <Pop />
      <Side />
      <Contact />
      <Info />
    </b-row>
    <b-tabs content-class="mt-3" fill>
      <b-tab title="Private" active>
        <b-row class="list-options">
          <b-col cols="10">
            <b-form-input
              type="search"
              placeholder="Search name"
              v-model="keyword"
              v-on:keyup.enter="onSearch"
            ></b-form-input>
          </b-col>
          <b-col cols="2" align-self="center">
            <img
              src="@/assets/icon/Plus.png"
              alt="plus"
              v-b-toggle.sidebar-contacts
            />
          </b-col>
        </b-row>
        <div class="rooms-c">
          <b-row
            class="list-rooms"
            v-for="(value, index) in rooms"
            :key="index"
            @click="onSelect(value)"
          >
            <b-col cols="3">
              <b-img
                :src="url + '/' + value.user_image"
                class="rooms-pict"
              ></b-img>
            </b-col>
            <b-col cols="6" style="padding: 0">
              <p class="rooms-name">{{ value.user_name }}</p>
              <p class="read" v-if="value.recent.user_id === user.user_id">
                Me: {{ value.recent.message.slice(0, 10) }}...
              </p>
              <p class="read" v-else>
                {{ value.recent.message.slice(0, 10) }}...
              </p>
            </b-col>
            <b-col cols="3" class="rooms-time">
              <p>{{ value.recent.message_created_at.slice(0, 16) }}</p>
              <b-badge v-if="value.unread > 0" class="counter">
                {{ value.unread }}
              </b-badge>
              <b-img
                :src="require('../assets/icon/Read-mark.png')"
                v-if="value.class === 'sent and read'"
              />
              <b-img
                :src="require('../assets/icon/Sent-mark.png')"
                v-if="value.class === 'sent'"
              />
            </b-col>
          </b-row>
        </div>
      </b-tab>

      <b-tab title="Group">
        <div class="rooms-c">
          <b-row
            class="list-rooms"
            v-for="(value, index) in groups"
            :key="index"
            @click="onSelectGroup(value)"
          >
            <b-col cols="9">
              <p class="rooms-name">{{ value.group_name }}</p>
              <p class="read">
                {{ value.recent.user_name }}:
                {{ value.recent.message.slice(0, 10) }}...
              </p>
            </b-col>
            <b-col cols="3" class="rooms-time">
              <p>{{ value.recent.message_created_at.slice(0, 16) }}</p>
            </b-col>
          </b-row>
        </div>
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
import Pop from '../components/Pop'
import Side from '../components/Side'
import Contact from '../components/Contact'
import Info from '../components/Info'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'List',
  components: {
    Pop,
    Side,
    Contact,
    Info
  },
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL,
      socket: io(process.env.VUE_APP_BASE_URL),
      prevRoom: '',
      keyword: ''
    }
  },
  methods: {
    ...mapActions([
      'getRoomByUserId',
      'getMessageByRoomId',
      'searchRoom',
      'getAllGroups'
    ]),
    ...mapMutations([
      'setSelect',
      'setSelectedRoom',
      'pushMessage',
      'setStatus'
    ]),
    onSelect(data) {
      this.keyword === ''
      this.getRoomByUserId(this.user.user_id)
      this.setSelectedRoom(data)
      const payload = {
        roomId: data.room_id,
        userId: this.user.user_id
      }
      this.getMessageByRoomId(payload)
      this.setSelect(true)
      if (!this.prevRoom) {
        this.socket.emit('joinRoom', data.room_id)
        this.prevRoom = data.room_id
      } else {
        this.socket.emit('changeRoom', {
          prevRoom: this.prevRoom,
          newRoom: data.room_id
        })
        this.prevRoom = data.room_id
      }
    },
    onSelectGroup(data) {
      this.getAllGroups()
      const setRoom = {
        recent: data.recent,
        room_id: data.group_id,
        room_updated_at: data.group_updated_at,
        user_name: data.group_name
      }
      this.setSelectedRoom(setRoom)
      const payload = {
        roomId: setRoom.room_id,
        userId: this.user.user_id
      }
      this.getMessageByRoomId(payload)
      this.setSelect(true)
      if (!this.prevRoom) {
        this.socket.emit('joinRoom', setRoom.room_id)
        this.prevRoom = setRoom.room_id
      } else {
        this.socket.emit('changeRoom', {
          prevRoom: this.prevRoom,
          newRoom: setRoom.room_id
        })
        this.prevRoom = setRoom.room_id
      }
    },
    onSearch() {
      if (this.keyword === '') {
        this.getRoomByUserId(this.user.user_id)
      } else {
        const payload = {
          id: this.user.user_id,
          keyword: this.keyword
        }
        this.searchRoom(payload)
      }
    },
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUserData',
      rooms: 'roomList',
      chat: 'getMessage',
      groups: 'getGroups'
    })
  },
  created() {
    this.getRoomByUserId(this.user.user_id)
    this.getAllGroups()
  },
  mounted() {
    this.socket.on('chatMessage', data => {
      this.pushMessage(data)
      this.getRoomByUserId(this.user.user_id)
    })
    this.socket.on('notification', data => {
      if (data.user === this.user.user_id) {
        this.makeToast('info', data.name, data.message)
      }
    })
    this.socket.on('setOnline', data => {
      const payload = {
        id: data,
        status: 1
      }
      this.setStatus(payload)
    })
    this.socket.on('setOffline', data => {
      const payload = {
        id: data,
        status: 0
      }
      this.setStatus(payload)
    })
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
