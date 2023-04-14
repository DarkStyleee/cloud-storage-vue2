import Vue from "vue";
import VueRouter from "vue-router";

const page = (path) => () =>
  import(`@/views/${path}`).then((m) => m.default || m);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: page("HomeView"),
  },
  {
    path: "/login",
    name: "login",
    component: page("auth/LoginView"),
  },
  {
    path: "/register",
    name: "register",
    component: page("auth/RegisterView"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
