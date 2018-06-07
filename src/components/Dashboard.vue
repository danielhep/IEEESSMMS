<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title v-if="!loading">
            <div v-if="!isInDebt" class="headline">Welcome, {{name}}. Your balance is ${{balance}}. </div>
            <div v-if="isInDebt" class="headline">Welcome, {{name}}. Your balance is -${{balance}}. </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="success" @click="addTransactionDialog = true">Add Money</v-btn>
            <v-btn color="info" @click="editProfileDialog = true">Edit Profile</v-btn>
            <v-btn color="error" @click="signOut">Sign Out</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex v-if="isInDebt" xs12 transition="slide-y-transition">
        <v-alert :value="true" type="error">
          You currently are ${{balance}} in debt. Please repay as soon as possible.
        </v-alert>
      </v-flex>
      <v-flex xs12>
        <v-data-table :pagination.sync="pagination" :loading="loading" :headers="headers" :items="transactions" class="elevation-1">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.transactionNo }}</td>
            <td>{{ props.item.date }}</td>
            <td class="text-xs-left">${{ (props.item.amount).toFixed(2) }}</td>
            <td v-if="props.item.balance >= 0" class="text-xs-left">${{ props.item.balance.toFixed(2) }}</td>
            <td v-if="props.item.balance < 0" class="text-xs-left">-${{ (-props.item.balance).toFixed(2) }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-btn fixed dark fab bottom right color="pink" @click.stop="addTransactionDialog = true">
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="addTransactionDialog" max-width="500px">
      <AddTransactionDialog @cancel="addTransactionDialog = false" @submit="transactionDialogSuccess"></AddTransactionDialog>
    </v-dialog>
    <v-dialog v-model="editProfileDialog" max-width="500px">
      <EditProfileDialog @cancel="editProfileDialog = false" @submit="profileEditDialogSuccess">
      </EditProfileDialog>
    </v-dialog>
    <v-snackbar :timeout="4000" color="success" v-model="successSnackbar">
      Data was submitted successfully. :)
      <v-btn dark flat @click.native="successSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import { API } from "aws-amplify";
import AddTransactionDialog from "@/components/AddTransactionDialog";
import EditProfileDialog from "@/components/EditProfileDialog";

export default {
  data() {
    return {
      successSnackbar: false,
      addTransactionDialog: false,
      editProfileDialog: false,
      headers: [
        { text: "#", align: "left", value: "transactionNo" },
        { text: "Date", align: "left", value: "date", sortable: false },
        { text: "Transaction Amount", value: "amount", sortable: false },
        { text: "Balance", value: "balance", sortable: false }
      ],
      loading: true,
      pagination: {
        descending: true,
        rowsPerPage: 10
      }
    };
  },
  created() {
    this.fetchData();
  },
  computed: {
    name() {
      return this.$store.getters.userFullName;
    },
    transactions() {
      return this.$store.state.transactionData;
    },
    balance() {
      return this.$store.getters.balance;
    },
    isInDebt() {
      return this.$store.getters.isInDebt;
    }
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("loadTransactionData");
      this.loading = false;
    },
    signOut() {
      this.$store.dispatch("signOut");
    },
    transactionDialogSuccess() {
      this.addTransactionDialog = false;
      this.successSnackbar = true;
      this.fetchData();
    },
    profileEditDialogSuccess() {
      this.successSnackbar = true;
      this.editProfileDialog = false;
    }
  },
  components: {
    AddTransactionDialog,
    EditProfileDialog
  }
};
</script>
