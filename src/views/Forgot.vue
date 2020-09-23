<template>
  <div class="login">
    <b-container class="login-c">
      <b-row>
        <b-col cols="1"><h1>&lt;</h1></b-col>
        <b-col cols="11" style="padding-right: 50px">
          <h1>Forgot Password</h1>
        </b-col>
      </b-row>
      <p class="welcome">You’ll get messages soon on your e-mail</p>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" class="login-btn">Send</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Forgot'
}
</script>

<style scoped src="../assets/css/style.css"></style>
