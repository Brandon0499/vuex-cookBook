import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import IndividualRecipe from "../views/IndividualRecipe.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/individualRecipe/:id",
      name: "individualRecipe",
      component: IndividualRecipe,
    },
  ],
});

export default router;
