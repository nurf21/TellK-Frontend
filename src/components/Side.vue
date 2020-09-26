<template>
  <b-sidebar id="sidebar-profle" shadow backdrop width="454px">
    <b-container>
      <div class="side-profile-header">
        <b-img :src="url + '/' + user.user_image"></b-img>
        <div class="edit-icon">
          <input
            type="file"
            ref="file"
            @change="upFile"
            style="display: none"
          />
          <p @click="$refs.file.click()" style="cursor: pointer;">
            Change Profile Photo
            <b-icon icon="pencil-fill"></b-icon>
          </p>
        </div>
        <p>{{ user.user_name }}</p>
      </div>
      <div class="side-profile">
        <h4>Account</h4>
        <h6>Phone Number</h6>
        <p>{{ user.user_phone }}</p>
        <h6>Email</h6>
        <p>{{ user.user_email }}</p>
        <hr />
        <h4>Settings</h4>
        <b-row class="side-settings">
          <b-col cols="1">
            <b-img :src="require('../assets/icon/edit.png')" />
          </b-col>
          <b-col cols="11" @click="onEdit()">
            <p>Edit Profile</p>
          </b-col>

          <b-col cols="1">
            <b-img :src="require('../assets/icon/placeholder.png')" />
          </b-col>
          <b-col cols="11" @click="$bvModal.show('bv-location')">
            <p>Location</p>
          </b-col>
          <b-col cols="1">
            <b-img :src="require('../assets/icon/logout.png')" />
          </b-col>
          <b-col cols="11" @click="handleLogout()"><p>Logout</p></b-col>
        </b-row>
      </div>
    </b-container>

    <b-modal id="bv-edit-profile" hide-footer centered>
      <template v-slot:modal-title>
        Edit Profile
      </template>
      <b-form @submit.prevent="onUpdate()">
        <b-form-group label-cols-sm="3" label="Email" label-for="nested-email">
          <b-form-input
            id="nested-email"
            disabled
            v-model="formProfile.user_email"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
          <b-form-input
            id="nested-name"
            required
            v-model="formProfile.user_name"
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Phone" label-for="nested-phone">
          <b-form-input
            id="nested-phone"
            required
            v-model="formProfile.user_phone"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" class="login-btn" style="margin-top: 35px">
          Save
        </b-button>
      </b-form>
    </b-modal>

    <b-modal id="bv-location" hide-footer centered size="lg">
      <template v-slot:modal-title>
        Location
      </template>
      <GmapMap
        :center="{ lat: +user.user_lat, lng: +user.user_lng }"
        :zoom="17.5"
        map-type-id="terrain"
        style="width: 100%; height: 500px"
      >
        <GmapMarker
          :position="{ lat: +user.user_lat, lng: +user.user_lng }"
          :clickable="true"
          :draggable="true"
          icon="https://img.icons8.com/color/48/000000/map-pin.png"
        />
      </GmapMap>
    </b-modal>
  </b-sidebar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Pop',
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL,
      formImage: {},
      formProfile: {},
      isLogout: false
    }
  },
  methods: {
    ...mapActions([
      'patchUserImage',
      'patchUserProfile',
      'getUserById',
      'logout'
    ]),
    upFile(event) {
      this.formImage.user_image = event.target.files[0]
      const data = new FormData()
      data.append('user_image', this.formImage.user_image)
      const payload = {
        id: this.user.user_id,
        form: data
      }
      this.patchUserImage(payload)
        .then(res => {
          this.getUserById(this.user.user_id)
          this.makeToast('success', 'Success', res.msg)
          this.formImage = {}
        })
        .catch(err => {
          this.makeToast('danger', 'Error', err.data.msg)
        })
    },
    onEdit() {
      this.formProfile = {
        user_email: this.user.user_email,
        user_name: this.user.user_name,
        user_phone: this.user.user_phone
      }
      this.$bvModal.show('bv-edit-profile')
    },
    onUpdate() {
      const payload = {
        id: this.user.user_id,
        form: this.formProfile
      }
      this.patchUserProfile(payload)
        .then(res => {
          this.getUserById(this.user.user_id)
          this.makeToast('success', 'Success', res.msg)
          this.$bvModal.hide('bv-edit-profile')
        })
        .catch(err => {
          this.makeToast('danger', 'Error', err.data.msg)
        })
    },
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    handleLogout() {
      this.$bvModal
        .msgBoxConfirm('Are you sure want to logout?', {
          cancelVariant: 'danger',
          okVariant: 'success',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        .then(value => {
          this.isLogout = value
          if (this.isLogout) {
            this.logout()
          }
        })
    }
  },
  computed: {
    ...mapGetters({ user: 'getUserData' })
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
