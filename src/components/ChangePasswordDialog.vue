<template>
  <v-card>
    <v-card-title>
      <span class="headline">Password Change</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="valid">
          <v-layout row wrap>
            <v-flex xs12>
              <v-alert :value="errorMessage" outline color="error" icon="warning">
                {{errorMessage}}
              </v-alert>
              <v-text-field :rules="required" type="password" label="Current Password" required v-model="oldPassword"></v-text-field>
              <v-text-field :rules="required" type="password" label="New Password" required loading v-model="newPassword">
                <v-progress-linear slot="progress" :value="progress" :color="color" height="7"></v-progress-linear>
              </v-text-field>
              <v-text-field :rules="confirmIdentical" type="password" label="New Password Confirm" required v-model="confirmPassword"></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="error" @click.native="$emit('cancel')">Cancel</v-btn>
      <v-btn :loading="loading" :disabled="!valid" block type="submit" color="info" @click.native="submit()">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { API } from "aws-amplify";
import { DateTime } from "luxon";
import { dataBus } from "../main.js";
import { Auth } from "aws-amplify";

export default {
  name: "ChangePasswordDialog",
  data() {
    return {
      loading: false,
      valid: true,
      newPassword: "",
      oldPassword: "",
      confirmPassword: "",
      required: [v => !!v || "This field is required."],
      confirmIdentical: [
        v =>
          !(v != this.newPassword) || "Password confirmation does not match.",
        v => !!v || "This field is required."
      ]
    };
  },
  computed: {
    progress() {
      return Math.min(100, this.newPassword.length * 100 / 8);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 50)];
    }
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        Auth.currentAuthenticatedUser()
          .then(user => {
            return Auth.changePassword(
              user,
              this.oldPassword,
              this.newPassword
            );
          })
          .then(data => {
            this.loading = false;
            this.$emit("submit");
          })
          .catch(data => {
            this.loading = false;

            console.log(data);
          });
      }
    }
  }
};
</script>
