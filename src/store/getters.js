export default {
  userSignedIn(state) {
    return state.user != null;
  },
  userFullName(state) {
    return state.user ? state.user.attributes.name : null;
  },
  balance(state) {
    return state.transactionData.length
      ? Math.abs(
          state.transactionData[state.transactionData.length - 1].balance
        ).toFixed(2)
      : "0";
  },
  isInDebt(state) {
    return state.transactionData.length
      ? state.transactionData[state.transactionData.length - 1].balance < 0
      : null;
  }
};
