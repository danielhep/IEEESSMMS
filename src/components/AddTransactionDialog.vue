<template>
  <v-card>
    <v-card-title>
      <span class="headline">Add Transaction</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-form ref="form" v-model="valid">
          <v-layout row wrap>
            <v-flex xs12>
              <v-radio-group required row v-model="form.type">
                <v-radio label="Deposit" value="deposit"></v-radio>
                <v-radio label="Withdrawal" value="withdrawal"></v-radio>
              </v-radio-group>
            </v-flex>
            <v-flex xs12>
              <v-text-field :rules="amountRules" type="number" :autofocus="true" label="Transaction Amount" prefix="$" required v-model="form.amount"></v-text-field>
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

export default {
  name: "AddTransactionDialog",
  data() {
    return {
      loading: false,
      valid: true,
      form: {
        type: "withdrawal"
      },
      amountRules: [
        v => !!v || "Amount is required.",
        v => (v && Number(v) >= 0.25) || "Amount must be more than $0.25"
      ]
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const newEntry = {
          date: DateTime.local().toISO(),
          amount: Number(this.form.amount),
          type: this.form.type
        };
        this.loading = true;
        API.post("transactionsCRUD", "/transactions", { body: newEntry }).then(
          data => {
            this.form = { type: "withdrawal" };
            this.loading = false;
            console.log(data);
            this.$emit("submit");
          }
        );
      }
    }
  }
};
</script>
