<template>
  <div class="login">
    <b-container class="login-c">
      <b-row v-if="!isSuccess">
        <b-col cols="1">
          <router-link to="/">
            <h1>&lt;</h1>
          </router-link>
        </b-col>
        <b-col cols="10" style="padding-right: 50px"><h1>Register</h1></b-col>
      </b-row>
      <p class="welcome" v-if="!isSuccess">Let’s create your account!</p>
      <p class="sign-up" v-if="isSuccess">
        Your account is created successfully. <br />
        Click
        <router-link to="/">
          <span>here</span>
        </router-link>
        to login.
      </p>
      <b-form @submit.prevent="onSubmit()" v-if="!isSuccess">
        <b-form-group id="input-group-1" label="Name" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.user_name"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.user_email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.user_password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-4"
          label="Phone Number"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.user_phone"
            required
            placeholder="Enter phone number"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" class="login-btn">Register</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      form: {},
      isSuccess: false
    }
  },
  methods: {
    ...mapActions(['register']),
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    onSubmit() {
      this.register(this.form)
        .then(response => {
          this.isSuccess = true
          this.makeToast('success', 'Success', response.data.msg)
        })
        .catch(error => {
          this.makeToast('danger', 'Error', error.data.msg)
        })
    }
  },
  created() {
    this.isSuccess = false
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
