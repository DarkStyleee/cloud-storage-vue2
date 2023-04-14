import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        background: "#333142",
        textColor: "#ffffff",
        defaultColor: "#3d477e",
        leftSideMenu: "#1e254c",
        cardColor: "#42485b",
        primary: "#3f51b5",
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
    },
  },
});
