<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Verify contact info</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert v-if="errorMessage" :value="true" color="error">
                  {{errorMessage}}
                </v-alert>
                <v-form>
                  <v-text-field id="wid" prepend-icon="lock" name="wid" label="WWU ID" type="text" v-model="wid"></v-text-field>
                  <v-text-field id="code" prepend-icon="lock" name="password" label="Code" type="text" v-model="code"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="submitVerification()" color="primary">Verify</v-btn>
                <v-btn @click="resend()" color="primary">Resend</v-btn>
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
  props: ["username"],
  data() {
    return {
      wid: this.$props.username,
      code: "",
      errorMessage: ""
    };
  },
  methods: {
    submitVerification() {
      Auth.confirmSignUp(this.wid, this.code)
        .then(() => {
          this.$router.push("/login");
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
