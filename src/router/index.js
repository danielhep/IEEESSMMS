import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import ConfirmSignUp from "@/components/ConfirmSignUp";

Vue.use(Router);

export default new Router({
  historyMode: true,
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: Dashboard
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/signup",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/signup/verify",
      name: "Confirm Sign Up",
      component: ConfirmSignUp
    }
  ]
});
