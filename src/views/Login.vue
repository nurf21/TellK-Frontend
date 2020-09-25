<template>
  <div class="login">
    <b-container class="login-c">
      <h1>Login</h1>
      <p class="welcome">Hi, welcome back!</p>
      <b-form @submit.prevent="onSubmit()">
        <b-form-group id="input-group-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.user_email"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.user_password"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <router-link to="/forgot">
          <p class="forgot">Forgot password?</p>
        </router-link>

        <b-button type="submit" class="login-btn">Login</b-button>
        <p class="alt-login">Login with</p>
        <b-button class="google-btn" v-b-modal.soon>Google</b-button>
        <p class="sign-up">
          Don't have an account?
          <router-link to="/register"><span>Sign Up</span></router-link>
        </p>
      </b-form>
      <Soon />
    </b-container>
  </div>
</template>

<script>
import Soon from '../components/Soon'
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  components: {
    Soon
  },
  data() {
    return {
      form: {}
    }
  },
  methods: {
    ...mapActions(['login']),
    makeToast(variant, title, msg) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    onSubmit() {
      this.login(this.form)
        .then(response => {
          this.makeToast('success', 'Success', response.data.msg)
          this.$router.push('/')
        })
        .catch(error => {
          this.makeToast('danger', 'Error', error.data.msg)
        })
    }
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
