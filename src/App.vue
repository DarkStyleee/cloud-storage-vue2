<template>
  <v-app
    :style="{
      'background-color': $vuetify.theme.themes.dark.background,
      color: $vuetify.theme.themes.dark.textColor,
    }"
  >
    <template v-if="$store.getters.getUser">
      <base-header :menuItems="menuItems">
        <template #profile>
          <base-profile></base-profile>
        </template>
      </base-header>
    </template>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import BaseHeader from "@/components/BaseHeader";
import BaseProfile from "@/components/BaseProfile";

export default {
  name: "App",
  components: {
    BaseHeader,
    BaseProfile,
  },
  created() {
    if (
      localStorage.getItem("token") &&
      localStorage.getItem("token") !== "null"
    ) {
      this.$store.dispatch("getUser");
      this.$store.getters.getUser && this.$router.push({ name: "home" });
    } else {
      this.$router.push({ name: "login" });
    }
  },
  data() {
    return {
      menuItems: [
        {
          title: "Home",
          icon: "mdi-home",
          link: "/",
        },
        {
          title: "About",
          icon: "mdi-account",
          link: "about",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "assets/styles/app.scss";
</style>
