<template>
  <v-app id="inspire" dark>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-title>IEEESSMMS (IEEE Student Store Money Manager System) {{username}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">Daniel Heppner &copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      user: { username: "test" }
    };
  },
  computed: {
    username() {
      return this.$store.getters.userSignedIn
        ? this.$store.state.user.username
        : "Not signed in.";
    }
  },
  name: "App"
};
</script>
