<template>
  <b-container style="padding: 0">
    <b-row class="list-header">
      <b-col cols="10"><p>TellK</p></b-col>
      <b-col cols="2">
        <img src="@/assets/icon/Menu.png" alt="toggle-menu" />
      </b-col>
    </b-row>
    <b-row class="list-options">
      <b-col cols="10">
        <b-form-input
          type="search"
          placeholder="Type your message..."
        ></b-form-input>
      </b-col>
      <b-col cols="2">
        <img src="@/assets/icon/Plus.png" alt="plus" />
      </b-col>
    </b-row>
    <div class="rooms-c">
      <b-row class="list-rooms" v-for="(value, index) in rooms" :key="index">
        <b-col cols="3">
          <b-img :src="value.img" class="rooms-pict"></b-img>
        </b-col>
        <b-col cols="6" style="padding: 0">
          <p class="rooms-name">{{ value.name }}</p>
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
            v-if="value.unread === 0 && value.status === 'read'"
          />
          <b-img
            :src="require('../assets/icon/Sent-mark.png')"
            v-if="
              value.unread === 0 && value.status === 'sent' && value.isSender
            "
          />
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'List',
  data() {
    return {
      rooms: [
        {
          img: require('../assets/img/theresa.png'),
          name: 'Theresa Webb',
          recent: 'Why did you do that',
          class: 'unread',
          time: '15:20',
          unread: 2,
          status: 'sent',
          isSender: false
        },
        {
          img: require('../assets/img/calvin.png'),
          name: 'Calvin Flores',
          recent: 'Hi, bro! Come to my house!',
          class: 'unread',
          time: '15:13',
          unread: 1,
          status: 'sent',
          isSender: false
        },
        {
          img: require('../assets/img/gregory.png'),
          name: 'Gregory Bell',
          recent: 'Will you stop ignoring me?',
          class: 'unread',
          time: '15:13',
          unread: 164,
          status: 'sent',
          isSender: false
        },
        {
          img: require('../assets/img/soham.png'),
          name: 'Soham Henry',
          recent: 'Bro, just fuck off',
          class: 'read',
          time: '8:30',
          unread: 0,
          status: 'read',
          isSender: true
        },
        {
          img: require('../assets/img/mother.png'),
          name: 'Mother ❤',
          recent: 'Yes, of course come, ... ',
          class: 'read',
          time: '7:20',
          unread: 0,
          status: 'sent',
          isSender: true
        },
        {
          img: require('../assets/img/brother.png'),
          name: 'Brother',
          recent: 'Ok. Good bay!',
          class: 'read',
          time: 'Yesterday',
          unread: 0,
          status: 'sent',
          isSender: false
        }
      ]
    }
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
