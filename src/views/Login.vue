<template>
  <div class="login">
    <b-container class="login-c">
      <h1>Login</h1>
      <p class="welcome">Hi, welcome back!</p>
      <b-form @submit.prevent="onSubmit">
        <b-form-group id="input-group-1" label="Email" label-for="input-1">
          <b-form-input
            id="input-1"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>

        <p class="forgot">Forgot password?</p>

        <b-button type="submit" class="login-btn">Login</b-button>
        <p class="alt-login">Login with</p>
        <b-button class="google-btn">Google</b-button>
        <p class="sign-up">Don't have an account? <span>Sign Up</span></p>
      </b-form>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped src="../assets/css/style.css"></style>
