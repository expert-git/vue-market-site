<template>
  <div class="container">
    <div class="left-column"></div>
    <div class="mobile-back">
      <img
        id="log-out"
        class="img-back"
        src="../assets/images/login_register/left-arrow.svg"
        @click="back"
      />
      <div class="mobile-back-label">LOGIN</div>
    </div>
    <div class="right-column">
      <div>
        <div>
          <back-button class="back-button" />
        </div>
        <form @submit="doSignIn" @change="removeError">
          <h1>Welcome Back</h1>
          <p>Vestibilum non nulla mollis, sempar lacus vitae, convallis metus. Maecenasinterdum tortor mollis</p>
          <input type="email" placeholder="Email" v-model.trim="email" required />
          <input type="password" placeholder="Password" v-model.trim="password" required />
          <div v-if="loginError" class="level">
            <p class="text-danger">{{ loginError }}</p>
          </div>
          <a href="#">Forgot Password?</a>
          <div class="btn-container">
            <div>
              <button class="login-button">Login</button>
            </div>
            <router-link to="/register">
              <div>
                <button class="register-button">Create Account</button>
              </div>
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import LoginButton from "@/components/LoginButton.vue";
import BackButton from "@/components/BackButton.vue";

@Component({
  components: {
    BackButton,
    LoginButton
  }
})
export default class Stats extends Vue {
  public email: string = "";
  public password: string = "";
  public loginError: string = "";
  public back() {
    this.$router.replace({ path: "/" });
  }
  public removeError() {
    this.loginError = "";
  }
  public async doSignIn(e) {
    e.preventDefault();
    this.loginError = "";
    try {
      await this.$store.dispatch("signIn", {
        email: this.email,
        password: this.password
      });
      if (this.$store.getters.getLastQuery) {
        this.$router.push({ name: "search" });
      } else {
        this.$router.push({ name: "home" });
      }
    } catch (e) {
      this.loginError = e.message;
    }
  }
}
</script>

<style scoped>
.text-danger {
  color: #dc3545 !important;
}

.container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: auto;
  grid-template-columns: 50% 50%;
}
.mobile-back {
  display: none;
}
.left-column {
  background-image: url("../assets/images/login_register/left_background.png");
  background-size: 100% 100%;
  height: auto;
}

.right-column div {
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto;
  font-family: "Nunito";
  color: #414b5a;
}

.back-button {
  align-self: center;
  grid-column: 2;
  justify-self: end;
  background-color: #fff;
}

.right-column div form {
  max-width: 403px;
  margin: 218px auto 0 auto;
  grid-row: 2;
}

.right-column form h1 {
  color: #414b5a;
  font-family: "Nunito Sans", sans-serif;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 0.5px;
  line-height: 32px;
}

.right-column form p {
  opacity: 0.7;
  color: #414b5a;
  font-family: "Nunito", sans-serif;
  font-size: 14px;
  letter-spacing: 0.2px;
  line-height: 24px;
}

form input {
  width: 100%;
  opacity: 0.5;
  font-size: 14px;
  letter-spacing: 0.2px;
  padding: 15px 25px;
  border-radius: 3px;
  -webkit-appearance: none;
  border: 1px solid #ced4da;
  margin-bottom: 30px;
  box-sizing: border-box;
}

form a {
  color: #25a2cd;
}

.right-column .btn-container {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  text-align: center;
  margin-top: 38px;
}

.right-column .btn-container button {
  width: fit-content;
  height: fit-content;
  font-size: 16px;
  border-radius: 3px;
  transition: 0.15s background-color ease-in, 0.15s color ease-in;
}

button.login-button {
  padding: 19px 60px;
  color: #fff;
  letter-spacing: 0.23px;
  background-color: #25a2cd;
  border: 0.5px solid #25a2cd;
}

button.login-button:hover {
  transition: 0.15s background-color ease-out, 0.15s color ease-out;
  background: #fff;
  color: #414b5a;
}

button.register-button {
  border: 0.5px solid #25a2cd;
  padding: 19px 42px;
  color: #2d2b2b;
  overflow: hidden;
  background-color: #fff;
}

button.register-button:hover {
  transition: 0.15s background-color ease-out, 0.15s color ease-out;
  color: white;
  background: #25a2cd;
}

@media screen and (max-width: 800px) {
  .left-column {
    display: none;
  }

  .container {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: auto;
    grid-template-columns: 100%;
  }

  .back-button {
    margin-right: 20px;
    background-color: #fff;
  }

  .right-column div form {
    margin: 50px auto 0 auto;
    padding: 0 10px;
  }

  .right-column .btn-container {
    grid-template-columns: 40% 40% 20%;
  }

  .right-column .btn-container button {
    width: 100%;
    margin-bottom: 10px;
    font-size: 11px;
    letter-spacing: 0.16px;
    line-height: 15px;
    font-family: Nunito;
    padding: 8px 10px;
  }

  button.register-button {
    background-color: #fff;
    margin-left: 15px;
    color: #25a2cd;
  }
  form a {
    font-size: 11px;
  }
  form p {
    font-size: 11px !important;
  }

  form > h1,
  form > p {
    display: none;
  }
  form input {
    width: 100%;
    opacity: 0.5;
    font-family: Nunito;
    font-size: 9px;
    letter-spacing: 0.13px;
    padding: 10px;
    -webkit-appearance: none;
    border: 0.5px solid rgba(206, 212, 218, 0.3);
    margin-top: 30px;
    box-sizing: border-box;
  }
  .right-column {
    border-radius: 20px 20px 0 0;
    background-color: rgba(241, 244, 248, 0.6);
    margin: 15px 10px 0px 10px;
    height: 100vh;
  }
  .back-button {
    display: none;
  }
  .mobile-back {
    display: inline-block !important;
    margin-top: 61px;
    margin-left: 20px;
  }
  .mobile-back .mobile-back-label {
    display: inline-block !important;
    margin-left: 15px;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.23px;
    line-height: 15px;
    color: #414b5a;
  }
  .mobile-back .img-back {
    height: 15px;
    display: inline-block !important;
    vertical-align: text-bottom;
    cursor: pointer;
  }
  .main {
    height: auto !important;
  }
}
</style>
