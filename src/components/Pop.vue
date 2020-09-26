<template>
  <div>
    <b-popover target="pop-burger" placement="bottomleft">
      <b-row class="burger-menu" v-b-toggle.sidebar-profle>
        <b-col cols="1">
          <img
            src="@/assets/icon/Settings.png"
            alt="settings"
            style="padding-left: 8px"
          />
        </b-col>
        <b-col cols="9"><p>Settings</p></b-col>
      </b-row>
      <b-row class="burger-menu" v-b-toggle.sidebar-contacts>
        <b-col cols="1">
          <img
            src="@/assets/icon/Contacts.png"
            alt="contact"
            style="padding-left: 8px"
          />
        </b-col>
        <b-col cols="9"><p>Contacts</p></b-col>
      </b-row>
      <b-row class="burger-menu">
        <b-col cols="1">
          <img src="@/assets/icon/Invite friends.png" alt="add-contact" />
        </b-col>
        <b-col
          cols="9"
          @click="$bvModal.show('bv-add')"
          style="cursor: pointer"
        >
          <p>Add Contact</p>
        </b-col>
      </b-row>
    </b-popover>
    <b-modal id="bv-add" hide-footer centered>
      <template v-slot:modal-title>
        Add Contact
      </template>
      <b-row class="list-options">
        <b-col cols="12">
          <b-form-input
            type="search"
            v-model="keyword"
            placeholder="Type email to search"
            v-on:keyup.enter="onSearch"
          ></b-form-input>
        </b-col>
        <b-col cols="12" v-if="notFound">
          <p style="color: red; font-size: 14px" class="mt-2">
            Oops... we couldn't find it. <br />
            Please make sure that you entered the right email.
          </p>
        </b-col>
      </b-row>
      <div class="side-profile-header" v-if="found">
        <b-img :src="url + '/' + searchResult.user_image"></b-img>
        <p class="mt-2">{{ searchResult.user_name }}</p>
        <b-button v-if="notAdded" class="add-contact" @click="onAdd()"
          >Add to contact</b-button
        >
        <b-button v-if="isAdded" class="add-contact" disabled>
          Already in your contact
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Pop',
  data() {
    return {
      keyword: '',
      notFound: false,
      found: false,
      isAdded: null,
      notAdded: null,
      url: process.env.VUE_APP_BASE_URL
    }
  },
  methods: {
    ...mapActions(['getUserByEmail', 'addContact', 'getContact']),
    onSearch() {
      this.notFound = false
      this.found = false
      this.getUserByEmail(this.keyword).then(res => {
        if (res.data.length === 0) {
          this.notFound = true
          this.found = false
        } else {
          this.found = true
          this.notFound = false
          const check = this.contact.some(
            el => el.user_id === this.searchResult.user_id
          )
          if (this.user.user_id === this.searchResult.user_id) {
            this.notAdded = false
            this.isAdded = false
          } else if (check) {
            this.isAdded = true
            this.notAdded = false
          } else if (!check) {
            this.notAdded = true
            this.isAdded = false
          }
        }
      })
    },
    onAdd() {
      const payload = {
        user_id: this.user.user_id,
        target_id: this.searchResult.user_id
      }
      this.addContact(payload).then(res => {
        const payloadContact = {
          id: this.user.user_id,
          keyword: ''
        }
        this.getContact(payloadContact)
        this.makeToast('success', 'Success', res.msg)
        this.isAdded = true
        this.notAdded = false
      })
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
      searchResult: 'getSearchResult',
      contact: 'contactList',
      user: 'getUserData'
    })
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
