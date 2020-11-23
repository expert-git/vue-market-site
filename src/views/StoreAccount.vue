<template>
  <div class="container">
    <div class="left-column"></div>
    <div class="right-column">
      <div>
        <div>
          <back-button class="back-button" />
        </div>
        <form @submit="doSignIn" @change="removeError">
          <h1>Store Account</h1>
          <p>Vestibilum non nulla mollis, sempar lacus vitae, convallis metus. Maecenasinterdum tortor mollis</p>
          <select v-model.trim="store">
            <option>tokopedia</option>
          </select>
          <input type="text" placeholder="Username" v-model.trim="email" required />
          <input type="password" placeholder="Password" v-model.trim="password" required />
          <div class="btn-container">
            <div>
              <button class="login-button">Login</button>
            </div>
            <div>
              <button class="publish-button">Publish</button>
            </div>
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
export default class StoreAccount extends Vue {
  public store: string = "";
  public email: string = "";
  public password: string = "";
  public loginError: string = "";

  public removeError() {
    this.loginError = "";
  }
  public async doSignIn(e) {
    e.preventDefault();
    this.loginError = "";   
  }
}
</script>

<style scoped>
.container {
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: auto;
  grid-template-columns: 50% 50%;
}

.left-column {
  background-image: url("../assets/images/login_register/left_background.png");
  background-size: 100% 100%;
  height: 1024px;
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

form input,
form select {
  width: 100%;
  opacity: 0.5;
  font-size: 14px;
  letter-spacing: 0.2px;
  padding: 15px 25px;
  border-radius: 3px;
  -webkit-appearance: none;
  border: 1px solid #ced4da;
  margin-bottom: 30px;
  background-color: #ffff;
  box-sizing: border-box;
}

form select {
  background-image: url("../assets/images/dropdown.svg");
  background-repeat: no-repeat;
  background-position: 93% center;
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

button.publish-button {
  border: 0.5px solid #25a2cd;
  padding: 19px 42px;
  color: #25a2cd;
}

button.publish-button:hover {
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
    grid-template-columns: 100%;
  }

  .right-column .btn-container button {
    width: 100%;
    margin-bottom: 10px;
  }

  button.register-button {
    background-color: #fff;
  }
}
</style>
