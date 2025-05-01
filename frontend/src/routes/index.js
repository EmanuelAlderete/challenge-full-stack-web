import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/login", component: () => import("@/pages/Login.vue") },
  {
    path: "/register",
    component: () => import("@/pages/Register.vue"),
  },
  {
    path: "/students",
    component: () => import("@/pages/Students.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
