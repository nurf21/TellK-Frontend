<template>
  <div class="login">
    <b-container class="login-c">
      <b-row>
        <b-col cols="1"><h1>&lt;</h1></b-col>
        <b-col cols="11" style="padding-right: 50px"><h1>Register</h1></b-col>
      </b-row>
      <p class="welcome">Let’s create your account!</p>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Name" label-for="input-1">
          <b-form-input
            id="input-1"
            required
            placeholder="Enter name"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Email" label-for="input-2">
          <b-form-input
            id="input-2"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Password" label-for="input-3">
          <b-form-input
            id="input-3"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" class="login-btn">Register</b-button>
        <p class="alt-login">Register with</p>
        <b-button class="google-btn">Google</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Register'
}
</script>

<style scoped src="../assets/css/style.css"></style>
