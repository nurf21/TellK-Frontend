<template>
  <b-container fluid>
    <b-row>
      <b-col cols="4" class="home-left"><List /></b-col>
      <b-col cols="8" style="padding: 0;" v-if="!isSelected"><Empty /></b-col>
      <b-col cols="8" style="padding: 0;" v-if="isSelected"><Room /></b-col>
    </b-row>
  </b-container>
</template>

<script>
import List from '@/components/List'
import Empty from '@/components/Empty'
import Room from '@/components/Room'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    List,
    Empty,
    Room
  },
  data() {
    return {
      isSelected: true
    }
  },
  methods: {
    ...mapActions(['getUserById', 'patchLocation'])
  },
  created() {
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
    ...mapGetters({ user: 'getUserData' })
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
