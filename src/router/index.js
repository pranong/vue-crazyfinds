import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/Home.vue";
import details from "../views/Details.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product",
    name: "Shop",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/product.vue"),
  },
  {
    path: "/details/:id",
    name: "details",
    component: details,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
