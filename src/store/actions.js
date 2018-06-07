import Amplify, { Auth, API } from "aws-amplify";
import { DateTime } from "luxon";
import router from "./router";

export default {
  async signOut({ commit }) {
    await Auth.signOut();
    commit("deleteUser");
  },
  async updateUser({ commit }) {
    try {
      let user = await Auth.currentAuthenticatedUser();
      commit("setUser", user);
    } catch (err) {
      router.push("/login");
    }
  },
  async signIn({ dispatch }, { username, password }) {
    try {
      let user = await Auth.signIn(username, password);
      dispatch("updateUser");
      return user;
    } catch (err) {
      return err;
    }
  },
  async loadTransactionData({ commit }) {
    let data = await API.get("transactionsCRUD", "/transactions");
    data = data.map(element => {
      element.date = DateTime.fromISO(element.date).toLocaleString(
        DateTime.DATETIME_FULL
      );
      return element;
    });
    commit("updateTransactionData", data);
    return data;
  }
};
