<template>
  <button v-on:click="back()">Back</button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class LoginButton extends Vue {
  public login() {
    this.$router.replace({ path: "/login" });
  }

  public back() {
    this.$router.replace({ path: "/" });
  }
}
</script>

<style scoped>
button {
  font-size: 12px;
  padding: 18px 34.5px 16px 34.5px;
  font-family: "Poppins", sans-serif;
  transition: 0.15s background-color ease-in, 0.15s color ease-in;
  border: 1px solid rgba(37, 162, 205, 0.8);
  border-radius: 0.3rem;
  display: block;
  width: fit-content;
  height: fit-content;
  text-transform: uppercase;
  color: #25a2cd;
  letter-spacing: 0.2rem;
  outline: none;
  font-weight: 500rem;
  margin: 18px 72px 0 0;
}

button:hover {
  transition: 0.15s background-color ease-out, 0.15s color ease-out;
  color: white;
  background: #25a2cd;
}
</style>
