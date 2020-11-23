<template>
  <div class="container">
    <div class="left-column"></div>
    <div class="right-column">
      <div>
        <div>
          <back-button class="back-button" />
        </div>
        <form @submit.prevent @change="removeError" action="#" method="POST">
          <h1>Create Account</h1>
          <p>Vestibilum non nulla mollis, sempar lacus vitae, convallis metus. Maecenasinterdum tortor mollis</p>
          <div class="form-group-divided">
            <div class="form-half">
              <label for="email">Email *</label>
              <input type="email" placeholder="Email" id="email" required v-model.trim="email" />
            </div>
            <div class="form-half second-half">
              <label for="password">Password *</label>
              <input
                type="password"
                placeholder="*********"
                id="password"
                required
                v-model.trim="password"
              />
            </div>
          </div>

          <div class="form-group-divided">
            <div class="form-half">
              <label for="fname">First Name *</label>
              <input type="text" placeholder="Dara" id="fname" required v-model.trim="fname" />
            </div>
            <div class="form-half second-half">
              <label for="lname">Last Name *</label>
              <input type="text" placeholder="Adhelia" id="lname" required v-model.trim="lname" />
            </div>
          </div>
          <div class="form-group-divided">
            <div class="form-half">
              <label for="gender">Gender *</label>
              <select type="text" placeholder="Female" id="gender" required v-model.trim="gender">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div class="form-half second-half">
              <label for="age">Age *</label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="21 years"
                id="age"
                required
                v-model.trim="age"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="location">Location *</label>
            <v-select
              type="text"
              id="location"
              required
              v-model.trim="location"
              :options="countrylist"
            />
          </div>
          <div class="form-group form-group-preferences">
            <label for="preferences">Preferences *</label>
            <v-select
              multiple
              type="text"
              id="preferences"
              required
              v-model.trim="preferences"
              :options="options"
            />
          </div>
          <div v-if="loginError" class="level">
            <p class="text-danger">{{ loginError }}</p>
          </div>
          <div class="btn-container">
            <div>
              <button class="register-button" @click="doSignUp">Create Account</button>
            </div>
            <router-link to="/login">
              <div>
                <button class="login-button">Login</button>
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

Vue.component("v-select", vSelect);

@Component({
  components: {
    BackButton,
    LoginButton
  }
})
export default class Register extends Vue {
  public age: string = "";
  public gender: string = "";
  public lname: string = "";
  public fname: string = "";
  public email: string = "";
  public password: string = "";
  public location: string = "";
  public preferences: string = "";
  public loginError: string = "";
  public complete: boolean = true;
  public options = ["Books", "Electronics", "Fashion", "Beauty Care"];
  public countrylist = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua & Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia & Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Estonia",
    "Ethiopia",
    "Falkland Islands",
    "Faroe Islands",
    "Fiji",
    "Finland",
    "France",
    "French Polynesia",
    "French West Indies",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Gibraltar",
    "Greece",
    "Greenland",
    "Grenada",
    "Guam",
    "Guatemala",
    "Guernsey",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Isle of Man",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jersey",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Kyrgyz Republic",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macau",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Montserrat",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Nepal",
    "Netherlands",
    "Netherlands Antilles",
    "New Caledonia",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Reunion",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Pierre & Miquelon",
    "Samoa",
    "San Marino",
    "Satellite",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "St Kitts & Nevis",
    "St Lucia",
    "St Vincent",
    "St. Lucia",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor L'Este",
    "Togo",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Turks & Caicos",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "United States Minor Outlying Islands",
    "Uruguay",
    "Uzbekistan",
    "Venezuela",
    "Vietnam",
    "Virgin Islands (US)",
    "Yemen",
    "Zambia",
    "Zimbabwe"
  ];
  public removeError() {
    this.loginError = "";
  }
  public async doSignUp(e) {
    e.preventDefault();
    try {
      this.loginError = "";
      await this.$store.dispatch("signUp", {
        email: this.email,
        password: this.password,
        lname: this.lname,
        fname: this.fname,
        age: this.age,
        gender: this.gender,
        location: this.location,
        preferences: this.preferences
      });
      this.loginError =
        "Thank you for your registration! Please, check your mail and verify it using verification link";
    } catch (e) {
      this.loginError = e.message;
    }
  }
}
</script>

<style>
.text-danger {
  color: #dc3545 !important;
}
.form-group.form-group-preferences {
  margin-top: 30px;
}
.form-group .vs__dropdown-toggle {
  opacity: 0.7;
  width: 100%;
  font-size: 14px;
  letter-spacing: 0.2px;
  padding: 5px 25px;
  border-radius: 3px;
  border: 1px solid #ced4da;
  box-sizing: border-box;
  -webkit-appearance: none;
  height: 48px;
}

.form-group.form-group-preferences .vs__dropdown-toggle {
  padding: 5px 5px;
}

.form-group .vs__dropdown-menu {
  width: 100%;
  font-size: 14px;
  letter-spacing: 0.2px;
  padding: 5px 5px;
}

.form-group span.vs__selected {
  font-family: Nunito;
  font-size: 14px;
  letter-spacing: 0.17px;
  line-height: 16px;
  background: white;
  /*margin: 7px 35px 7px 10px;*/
}

.form-group .vs__actions svg {
  zoom: 70%;
  opacity: 0.5;
}

/*.form-group .vs__actions {*/
/*background: url(../assets/images/login_register/chevron-left.svg) 92% / 6% no-repeat;*/
/*}*/

.form-group span.vs__selected svg {
  zoom: 70%;
}
</style>
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
}

.right-column div form {
  max-width: 403px;
  margin: 58px auto 0 auto;
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
  font-family: Nunito;
  letter-spacing: 0.2px;
  padding: 15px 25px;
  border-radius: 3px;
  -webkit-appearance: none;
  border: 1px solid #ced4da;
  margin-bottom: 30px;
  box-sizing: border-box;
}

form select {
  width: 100%;
  opacity: 0.5;
  font-size: 14px;
  font-family: Nunito;
  letter-spacing: 0.2px;
  padding: 15px 25px;
  border-radius: 3px;
  border: 1px solid #ced4da;
  margin-bottom: 30px;
  box-sizing: border-box;
  -webkit-appearance: none;
  background: url(../assets/images/login_register/chevron-left.svg) 92% / 6%
    no-repeat;
}

form .vs__search {
  width: 100%;
  opacity: 0.5;
  font-size: 14px;
  letter-spacing: 0.2px;
  padding: 15px 25px;
  border-radius: 3px;
  border: 1px solid #ced4da;
  margin-bottom: 30px;
  box-sizing: border-box;
  -webkit-appearance: none;
  background: url(../assets/images/login_register/chevron-left.svg) 92% / 6%
    no-repeat;
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
  margin-left: 35px;
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
}

button.register-button:hover {
  transition: 0.15s background-color ease-out, 0.15s color ease-out;
  color: white;
  background: #25a2cd;
}

.form-group-divided label,
.form-group label {
  width: 100%;
  height: 19px;
  color: #17181f;
  font-family: "Nunito Sans";
  font-weight: bold;
  font-size: 14px;
  letter-spacing: 0.2px;
  line-height: 19px;
  padding-bottom: 10px;
  opacity: 0.7;
}

.form-group-divided {
  display: grid !important;
  grid-template-columns: 50% 50% !important;
  grid-template-rows: auto !important;
}

.form-group-divided .form-half {
  width: 97%;
}

.form-group-divided .form-half.second-half {
  justify-self: right;
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

  button.login-button {
    margin-left: 0;
  }
}
</style>
