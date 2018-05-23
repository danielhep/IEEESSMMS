// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import Amplify, { Auth, Logger } from "aws-amplify";
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);

Vue.use(Vuetify);

Vue.config.productionTip = false;
export const dataBus = new Vue({
  data: {
    username: "username test"
  }
});

Auth.currentUserPoolUser().then(usr => {
  dataBus.$data.username = usr.username;
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
