<template>
  <div class="login">
    <b-container class="login-c">
      <b-row>
        <b-col cols="1">
          <router-link to="/">
            <h1>&lt;</h1>
          </router-link>
        </b-col>
        <b-col cols="11" style="padding-right: 50px">
          <h1>Reset Password</h1>
        </b-col>
      </b-row>
      <p class="sign-up" v-if="isSuccess">
        Reset password success. Click back icon to login.
      </p>
      <p class="welcome" v-if="!isSuccess">
        Set your new password
      </p>
      <b-form @submit.prevent="onSubmit" v-if="!isSuccess">
        <b-form-group
          id="input-group-1"
          label="New Password"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="password"
            required
            placeholder="Enter password"
            v-model="form.newPassword"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Confirm Password"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            type="password"
            required
            placeholder="Confirm password"
            v-model="form.confirmPassword"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="login-btn" v-b-modal>Submit</b-button>
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
      form: {},
      isSuccess: false
    }
  },
  methods: {
    ...mapActions(['resetPassword']),
    onSubmit() {
      this.form.key = this.$route.query.key
      this.resetPassword(this.form)
        .then(response => {
          console.log(response.msg)
          this.isSuccess = true
        })
        .catch(error => {
          this.makeToast(error.data.msg, 'Error', 'danger')
        })
    },
    makeToast(msg, title, variant) {
      this.$bvToast.toast(msg, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style scoped src="../assets/css/style.css"></style>
