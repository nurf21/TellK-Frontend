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
    <b-row class="list-options">
      <b-col cols="10">
        <b-form-input type="search" placeholder="Search message"></b-form-input>
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
      <b-row class="list-rooms" v-for="(value, index) in rooms" :key="index">
        <b-col cols="3">
          <b-img :src="url + '/' + value.user_image" class="rooms-pict"></b-img>
        </b-col>
        <b-col cols="6" style="padding: 0">
          <p class="rooms-name">{{ value.user_name }}</p>
          <p :class="value.class" v-if="value.isSender">
            Me: {{ value.recent }}
          </p>
          <p :class="value.class" v-else>{{ value.recent }}</p>
        </b-col>
        <b-col cols="3" class="rooms-time">
          <p>{{ value.time }}</p>
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
  </b-container>
</template>

<script>
import Pop from '../components/Pop'
import Side from '../components/Side'
import Contact from '../components/Contact'
import Info from '../components/Info'
import { mapActions, mapGetters } from 'vuex'

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
      url: process.env.VUE_APP_BASE_URL
      // rooms: [
      //   {
      //     img: require('../assets/img/theresa.png'),
      //     name: 'Theresa Webb',
      //     recent: 'Why did you do that',
      //     class: 'unread',
      //     time: '15:20',
      //     unread: 2,
      //     isSender: false
      //   },
      //   {
      //     img: require('../assets/img/calvin.png'),
      //     name: 'Calvin Flores',
      //     recent: 'Hi, bro! Come to my house!',
      //     class: 'unread',
      //     time: '15:13',
      //     unread: 1,
      //     isSender: false
      //   },
      //   {
      //     img: require('../assets/img/gregory.png'),
      //     name: 'Gregory Bell',
      //     recent: 'Will you stop ignoring me?',
      //     class: 'unread',
      //     time: '15:13',
      //     unread: 164,
      //     isSender: false
      //   },
      //   {
      //     img: require('../assets/img/soham.png'),
      //     name: 'Soham Henry',
      //     recent: 'Bro, just fuck off',
      //     class: 'sent and read',
      //     time: '8:30',
      //     unread: 0,
      //     isSender: true
      //   },
      //   {
      //     img: require('../assets/img/mother.png'),
      //     name: 'Mother ❤',
      //     recent: 'Yes, of course come, ... ',
      //     class: 'sent',
      //     time: '7:20',
      //     unread: 0,
      //     status: 'sent',
      //     isSender: true
      //   },
      //   {
      //     img: require('../assets/img/brother.png'),
      //     name: 'Brother',
      //     recent: 'Ok. Good bay!',
      //     class: 'read',
      //     time: 'Yesterday',
      //     unread: 0,
      //     isSender: false
      //   }
      // ]
    }
  },
  methods: {
    ...mapActions(['getRoomByUserId'])
  },
  computed: {
    ...mapGetters({ user: 'getUserData', rooms: 'roomList' })
  },
  created() {
    this.getRoomByUserId(this.user.user_id)
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
