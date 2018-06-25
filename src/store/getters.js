import { get, last } from "lodash";

export default {
  userSignedIn(state) {
    return state.user != null;
  },
  userFullName(state) {
    return get(state, "user.attributes.name", "Not signed in.");
  },
  balance(state) {
    return get(last(get(state, "transactionData")), "balance");
  },
  isInDebt(state) {
    return get(last(get(state, "transactionData")), "balance") < 0;
  }
};
