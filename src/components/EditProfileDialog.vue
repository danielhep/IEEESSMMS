<template>
  <v-card>
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="valid">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field :rules="required" type="text" label="Full Name" required v-model="user.attributes.name"></v-text-field>
              <v-text-field :rules="required" type="text" disabled label="Western ID (username)" required v-model="user.username"></v-text-field>
              <v-text-field :rules="required" type="text" label="Email Address" required v-model="user.attributes.email"></v-text-field>
              <v-text-field :rules="required" mask="+# (###) ###-####" label="Phone Number" required v-model="user.attributes.phone_number"></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
        <v-dialog v-model="changePasswordDialog" max-width="400px">
          <ChangePasswordDialog @cancel="changePasswordDialog = false" @submit="changePasswordDialogSuccess">
          </ChangePasswordDialog>
        </v-dialog>
        <v-snackbar :timeout="4000" color="success" v-model="successSnackbar">
          Password was changed successfully! :)
          <v-btn dark flat @click.native="successSnackbar = false">Close</v-btn>
        </v-snackbar>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="error" @click.native="$emit('cancel')">Cancel</v-btn>
      <v-btn block color="success" @click.native="changePasswordDialog = true">Change Password</v-btn>
      <v-btn :loading="loading" :disabled="!valid" block type="submit" color="info" @click.native="submit()">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { API } from "aws-amplify";
import { DateTime } from "luxon";
import { dataBus } from "../main.js";
import { Auth } from "aws-amplify";

import ChangePasswordDialog from "@/components/ChangePasswordDialog";

export default {
  name: "EditProfileDialog",
  data() {
    return {
      loading: false,
      valid: true,
      changePasswordDialog: false,
      successSnackbar: false,
      name: "test",
      user: { username: "test", attributes: {} },
      required: [v => !!v || "This field is required."]
    };
  },
  mounted() {
    Auth.currentAuthenticatedUser().then(user => {
      this.user = user;
    });
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.user.attributes.phone_number = `+${
          this.user.attributes.phone_number
        }`;
        Auth.updateUserAttributes(this.user, this.user.attributes).then(
          result => {
            this.loading = false;
            this.$emit("submit");
          }
        );
      }
    },
    changePasswordDialogSuccess() {
      this.changePasswordDialog = false;
      this.successSnackbar = true;
    }
  },
  components: {
    ChangePasswordDialog
  }
};
</script>
