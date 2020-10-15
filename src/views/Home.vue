<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" md="4" class="home-left"><List /></b-col>
      <b-col cols="8" style="padding: 0;" v-if="!isSelected" class="desktop"
        ><Empty
      /></b-col>
      <b-col cols="8" style="padding: 0;" v-if="isSelected" class="desktop"
        ><Room
      /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import List from '@/components/List'
import Empty from '@/components/Empty'
import Room from '@/components/Room'
import io from 'socket.io-client'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Home',
  components: {
    List,
    Empty,
    Room
  },
  data() {
    return {
      socket: io(process.env.VUE_APP_BASE_URL)
    }
  },
  methods: {
    ...mapActions(['getUserById', 'patchLocation', 'logout']),
    ...mapMutations(['setSelect'])
  },
  created() {
    if (this.user.user_id === undefined) {
      this.logout(this.user.user_id)
    }
    this.socket.emit('online', this.user.user_id)
    this.setSelect(false)
    this.getUserById(this.user.user_id)
    this.$getLocation()
      .then(coordinates => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        const payload = {
          id: this.user.user_id,
          form: this.coordinate
        }
        this.patchLocation(payload).then(res => {
          console.log(res.msg)
          this.getUserById(this.user.user_id)
        })
      })
      .catch(error => {
        alert(error)
      })
  },
  computed: {
    ...mapGetters({ user: 'getUserData', isSelected: 'getSelect' })
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
