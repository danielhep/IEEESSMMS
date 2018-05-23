<template>
  <v-container fluid>
     <v-data-table
    :headers="headers"
    :items="transactions"
    hide-actions
    class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.date }}</td>
        <td class="text-xs-left">{{ props.item.amount }}</td>
        <td class="text-xs-left">{{ props.item.balance }}</td>
      </template>
    </v-data-table>
    <v-btn
      fixed
      dark
      fab
      bottom
      right
      color="pink"
      @click.stop="addTransactionDialog = true"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="addTransactionDialog" max-width="500px">
      <AddTransactionDialog @cancel="addTransactionDialog = false" @submit="submitNewTransaction"></AddTransactionDialog>
    </v-dialog>
  </v-container>
</template>
<script>
import { API } from "aws-amplify";
import { dataBus } from "../main.js";
import { DateTime } from "luxon";
import AddTransactionDialog from "@/components/AddTransactionDialog";

export default {
  data() {
    return {
      addTransactionDialog: false,
      username: dataBus.$data.username,
      headers: [
        { text: "Date", align: "left", value: "date" },
        { text: "Transaction Amount", value: "amount", sortable: false },
        { text: "Balance", value: "balance", sortable: false }
      ],
      transactions: []
    };
  },
  created() {
    API.get("transactionsCRUD", "/transactions").then(result => {
      result = result.map(element => {
        element.date = DateTime.fromISO(element.date).toLocaleString(
          DateTime.DATETIME_FULL
        );
        return element;
      });
      this.transactions = result;
    });
  },
  methods: {
    submitNewTransaction(formData) {
      const newEntry = {
        date: DateType.local().toISO(),
        amount: formData.amount,
        type: formData.type
      };
      API.post("transactionsCRUD", "/transactions", { body: newEntry });
    }
  },
  components: {
    AddTransactionDialog
  }
};
</script>
