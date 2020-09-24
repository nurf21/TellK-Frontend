<template>
  <b-container class="room">
    <div class="room-header">
      <b-row class="room-header-row">
        <b-col cols="1" class="rooms-pict" align-self="center">
          <b-img :src="room.pict" />
        </b-col>
        <b-col cols="10" align-self="center">
          <p class="room-name">{{ room.name }}</p>
          <p class="room-status">{{ room.status }}</p>
        </b-col>
        <b-col cols="1" align-self="center">
          <b-img :src="require('../assets/icon/Profile menu.png')" />
        </b-col>
      </b-row>
    </div>
    <div id="chat-c">
      <b-container>
        <b-row v-for="(value, index) in chat" :key="index">
          <b-col :class="value.class" v-if="value.class === 'sender'">
            {{ value.msg }}
          </b-col>
          <b-col v-if="value.class === 'receiver'">
            <div :class="value.class" class="float-right">{{ value.msg }}</div>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <b-container class="input-c">
      <b-row>
        <b-col cols="11">
          <b-form-input placeholder="Type your message..."></b-form-input>
        </b-col>
        <b-col cols="1">
          <b-button>
            <b-img :src="require('../assets/icon/Send.png')" />
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: 'Chat',
  data() {
    return {
      room: {
        pict: require('../assets/img/mother.png'),
        name: 'Mother ❤',
        status: 'Online'
      },
      chat: [
        {
          msg:
            'Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.',
          class: 'sender'
        },
        {
          msg: 'Oh! Cool Send me photo',
          class: 'receiver'
        },
        {
          msg: 'Ok😉',
          class: 'sender'
        },
        {
          msg: 'Will we arrive tomorrow?',
          class: 'sender'
        },
        {
          msg: 'Oh! Cool Send me photo',
          class: 'receiver'
        },
        {
          msg: 'Thankyou',
          class: 'sender'
        }
      ]
    }
  },
  methods: {
    scrollToEnd() {
      const container = this.$el.querySelector('#chat-c')
      container.scrollTop = container.scrollHeight
    }
  },
  mounted() {
    this.scrollToEnd()
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
