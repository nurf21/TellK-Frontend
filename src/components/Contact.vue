<template>
  <b-sidebar
    id="sidebar-contacts"
    title="Contacts"
    shadow
    backdrop
    width="454px"
    ref="sidebarContacts"
  >
    <b-container class="contact-c">
      <b-row class="list-options" style="margin-top: 30px">
        <b-col cols="12">
          <b-form-input
            type="search"
            v-model="keyword"
            placeholder="Search contact"
            v-on:keyup.enter="onSearch"
          ></b-form-input>
        </b-col>
      </b-row>
      <div class="contact-empty" v-if="contact.length === 0">
        <p>Oops, looks like you don't have any contact yet.</p>
      </div>
      <b-row
        v-else
        v-for="(value, index) in contact"
        :key="index"
        class="contact-row"
      >
        <b-col cols="3">
          <b-img :src="url + '/' + value.user_image" class="rooms-pict"></b-img>
        </b-col>
        <b-col
          cols="6"
          align-self="center"
          class="rooms-name"
          @click="onContact(value)"
          v-b-toggle.sidebar-info
          style="cursor: pointer"
        >
          {{ value.user_name }}
        </b-col>
        <b-col cols="3" align-self="center">
          <b-button class="chat-btn">
            <b-img :src="require('../assets/icon/chat.png')"></b-img>
          </b-button>
          <b-button class="delete-btn" @click="onDelete(value)">
            <b-img :src="require('../assets/icon/delete.png')"></b-img>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </b-sidebar>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Contacts',
  data() {
    return {
      url: process.env.VUE_APP_BASE_URL,
      keyword: '',
      isDelete: false
    }
  },
  methods: {
    ...mapActions(['getContact', 'deleteContact']),
    ...mapMutations(['setContactInfo']),
    onSearch() {
      const payload = {
        id: this.user.user_id,
        keyword: this.keyword
      }
      this.getContact(payload)
    },
    onDelete(data) {
      this.$bvModal
        .msgBoxConfirm(
          `Are you sure you want to remove ${data.user_name} from your contact ?`,
          {
            cancelVariant: 'info',
            okVariant: 'danger',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
          }
        )
        .then(value => {
          this.isDelete = value
          if (this.isDelete === true) {
            const payload = {
              id: this.user.user_id,
              targetId: data.user_id
            }
            this.deleteContact(payload).then(res => {
              const payloadContact = {
                id: this.user.user_id,
                keyword: this.keyword
              }
              this.getContact(payloadContact)
              this.makeToast('success', 'Success', res.msg)
            })
          }
        })
    },
    onContact(data) {
      this.setContactInfo(data)
      this.$refs.sidebarContacts.hide()
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
    ...mapGetters({ user: 'getUserData', contact: 'contactList' })
  },
  created() {
    const payload = {
      id: this.user.user_id,
      keyword: ''
    }
    this.getContact(payload)
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
