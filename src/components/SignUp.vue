<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Sign Up form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert v-if="errorMessage" :value="true" color="error">
                  {{errorMessage}}
                </v-alert>
                <v-form>
                  <v-text-field id="email" prepend-icon="lock" name="email" label="WWU Email" type="text" v-model="credentials.email"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password" v-model="credentials.password"></v-text-field>
                  <v-text-field id="phone" prepend-icon="lock" name="phone" label="Phone Number" type="text" v-model="credentials.phone"></v-text-field>
                  <v-text-field id="wid" prepend-icon="lock" name="password" label="Password" type="text" v-model="credentials.wid"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="submitRegistration()" color="primary">Register</v-btn>
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

export default {
  name: "Login",
  data() {
    return {
      credentials: {
        email: "",
        password: "",
        phone: "",
        wid: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    submitRegistration() {
      Auth.signUp({
        username: this.credentials.wid,
        password: this.credentials.password,
        attributes: {
          email: this.credentials.email,
          phone_number: this.credentials.phone
        }
      })
        .then(usr => {
          console.log("sign up success", usr);
          console.log(Auth.currentAuthenticatedUser());
          this.$router.push("/signup/verify");
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = err.message;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
main {
  background: url("../assets/loginbg.jpg");
  background-size: cover;
  width: 100%;
  height: 100vh;
}
</style>
