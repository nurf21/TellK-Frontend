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
      <b-row class="burger-menu">
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
        <b-col cols="9"><p>Add Contact</p></b-col>
      </b-row>
    </b-popover>
  </div>
</template>

<script>
export default {
  name: 'Pop'
}
</script>

<style scoped src="../assets/css/style.css"></style>
