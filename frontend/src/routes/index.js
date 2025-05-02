import { createRouter, createWebHistory } from "vue-router";
import { isTokenValid } from "@/utils/tokenValidator";

const routes = [
  { path: "/login", component: () => import("@/pages/Login.vue") },
  {
    path: "/register",
    component: () => import("@/pages/Register.vue"),
  },
  {
    path: "/students",
    component: () => import("@/pages/Students.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = isTokenValid(token);

  if ((to.path === "/login" || to.path === "/register") && isAuthenticated) {
    next("/students");
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
