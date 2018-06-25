import Amplify, { Auth, API } from "aws-amplify";
import { DateTime } from "luxon";
import router from "../router";

export default {
  async signOut({ commit }) {
    await Auth.signOut();
    commit("setUser", null);
    router.push("/login");
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
      throw err;
    }
  },
  async signUp({ commit }, { wid, password, phone, email, name }) {
    let obj = {
      username: wid,
      password,
      attributes: { email, phone_number: phone, name }
    };
    return await Auth.signUp(obj);
  },
  async resendSignUp({ commit }, username) {
    try {
      let user = await Auth.resendSignUp(username);
      return user;
    } catch (err) {
      throw err;
    }
  },
  async loadTransactionData({ commit }) {
    let data = await API.get("transactionsCRUD", "/transactions");
    if (data) {
      data = data.map(element => {
        element.date = DateTime.fromISO(element.date).toLocaleString(
          DateTime.DATETIME_FULL
        );
        return element;
      });
      commit("updateTransactionData", data);
    } else {
      data = [];
    }
    return data;
  }
};
