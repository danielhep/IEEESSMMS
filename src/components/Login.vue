<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-alert v-if="errorMessage" :value="true" color="error">
                  {{errorMessage}}
                </v-alert>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="Login" type="text" v-model="credentials.username"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="credentials.password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submitLogin()" color="primary">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { Auth } from "aws-amplify";
import { dataBus } from "../main.js";

export default {
  name: "Login",
  props: ["user"],
  data() {
    return {
      bus: dataBus.$data,
      credentials: {
        username: "",
        password: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    submitLogin() {
      Auth.signIn(this.credentials.username, this.credentials.password)
        .then(usr => {
          this.bus.username = usr.username;
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.message;
          switch (err.code) {
            case "UserNotConfirmedException":
              this.$router.push("/signup/verify");
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  /* display: flex !important; */
  /* flex-direction: column; */
  /* justify-content: center; */

  background: url("../assets/loginbg.jpg");
  background-size: cover;
  width: 100%;
  height: 100vh;
}
</style>
