<template>
  <b-sidebar id="sidebar-info" right shadow width="500px">
    <b-container>
      <div class="side-profile-header">
        <b-img :src="url + '/' + info.user_image"></b-img>
        <p>{{ info.user_name }}</p>
      </div>
      <div class="side-profile">
        <h6>Phone Number</h6>
        <p>{{ info.user_phone }}</p>
        <h6>Email</h6>
        <p>{{ info.user_email }}</p>
        <hr />
        <h4>Location</h4>
        <GmapMap
          :center="{ lat: +info.user_lat, lng: +info.user_lng }"
          :zoom="17.5"
          map-type-id="roadmap"
          style="width: 100%; height: 300px"
        >
          <GmapMarker
            :position="{ lat: +info.user_lat, lng: +info.user_lng }"
            :clickable="true"
            :draggable="true"
            icon="https://img.icons8.com/color/48/000000/map-pin.png"
          />
        </GmapMap>
      </div>
    </b-container>
  </b-sidebar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Info',
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL
    }
  },
  computed: {
    ...mapGetters({ info: 'getContactInfo' })
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
