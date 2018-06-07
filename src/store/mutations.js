export default {
  setUser(state, user) {
    state.user = user;
  },
  deleteUser(state) {
    state.user = null;
    router.push("/login");
  },
  updateTransactionData(state, data) {
    state.transactionData = data;
  }
};
