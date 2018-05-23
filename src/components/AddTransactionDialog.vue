<template>
  <v-card>
    <v-card-title>
      <span class="headline">User Profile</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12>
            <v-radio-group row v-model="form.type">
              <v-radio label="Deposit" value="deposit"></v-radio>
              <v-radio selected label="Withdrawal" value="withdrawal"></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex>
            <v-text-field label="Transaction Amount" prepend-icon="money" required v-model="form.amount"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click.native="$emit('cancel')">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click.native="$emit('submit', form)">Submit</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "AddTransactionDialog",
  data() {
    return {
      form: {}
    };
  },
  methods: {
    submit() {}
  }
};
</script>
