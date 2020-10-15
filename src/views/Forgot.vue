<template>
  <div class="login">
    <b-container class="login-c">
      <b-row>
        <b-col cols="1">
          <router-link to="/">
            <h1>&lt;</h1>
          </router-link>
        </b-col>
        <b-col cols="10" style="padding-right: 50px">
          <h1>Forgot Password</h1>
        </b-col>
      </b-row>
      <p class="sign-up" v-if="isSuccess">
        Email sent, please check your email to reset password.
      </p>
      <p class="welcome" v-if="!isSuccess">
        You’ll get messages soon on your e-mail
      </p>
      <b-form @submit.prevent="onSubmit" v-if="!isSuccess">
        <b-form-group id="input-group-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            type="email"
            required
            placeholder="Enter email"
            v-model="email"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="login-btn" v-b-modal.soon>Send</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Forgot',
  data() {
    return {
      email: '',
      isSuccess: false
    }
  },
  methods: {
    ...mapActions(['forgotPassword']),
    onSubmit() {
      const payload = {
        email: this.email
      }
      this.forgotPassword(payload)
        .then(response => {
          console.log(response.msg)
          this.isSuccess = true
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
