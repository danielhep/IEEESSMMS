<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="blue-grey darken-2" class="white--text">
          <v-card-title primary-title>
            <div v-if="balance >= 0" class="headline">Welcome, {{dataBus.$data.user.username}}. Your balance is ${{balance.toFixed(2)}}. </div>
            <div v-if="balance < 0" class="headline">Welcome, {{dataBus.$data.user.username}}. Your balance is -${{(-balance).toFixed(2)}}. Please add funds. </div>
          </v-card-title>
          <v-card-actions>
            <v-btn color="success">Add Money</v-btn>
            <v-btn color="info" @click="editProfileDialog = true">Edit Profile</v-btn>
            <v-btn color="error" @click="console.log(pagination)">Sign Out</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex v-if="balance < 0" xs12 transition="slide-y-transition">
        <v-alert :value="true" type="warning">
          You currently are ${{(-balance).toFixed(2)}} in debt. Please repay as soon as possible.
        </v-alert>
      </v-flex>
      <v-flex xs12>
        <v-data-table :pagination.sync="pagination" :loading="loading" :headers="headers" :items="transactions" hide-actions class="elevation-1">
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
import { dataBus } from "../main.js";
import { DateTime } from "luxon";
import AddTransactionDialog from "@/components/AddTransactionDialog";
import EditProfileDialog from "@/components/EditProfileDialog";

export default {
  data() {
    return {
      successSnackbar: false,
      addTransactionDialog: false,
      editProfileDialog: false,
      dataBus: dataBus,
      balance: 0,
      headers: [
        { text: "#", align: "left", value: "transactionNo" },
        { text: "Date", align: "left", value: "date", sortable: false },
        { text: "Transaction Amount", value: "amount", sortable: false },
        { text: "Balance", value: "balance", sortable: false }
      ],
      transactions: [],
      loading: true,
      pagination: {
        descending: true
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      API.get("transactionsCRUD", "/transactions").then(result => {
        this.loading = false;
        console.log(result);
        result = result.map(element => {
          element.date = DateTime.fromISO(element.date).toLocaleString(
            DateTime.DATETIME_FULL
          );
          return element;
        });
        this.balance = result[result.length - 1].balance;
        this.transactions = result;
      });
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
