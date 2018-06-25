import Vue from "vue";
import Router from "vue-router";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import ConfirmSignUp from "@/components/ConfirmSignUp";

Vue.use(Router);

export default new Router({
  mode: "history",
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
      path: "/register",
      name: "Sign Up",
      component: SignUp
    },
    {
      path: "/register/verify/:username",
      name: "Confirm Sign Up",
      component: ConfirmSignUp,
      props: true
    }
  ]
});
