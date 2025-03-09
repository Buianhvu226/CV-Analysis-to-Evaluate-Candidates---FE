import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Auth/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Auth/Register.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Candidate/Applications.vue"),
    },
  ],
});

// Navigation guards
router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in

  if (to.meta.requiresAuth && !isLoggedIn) {
    // Redirect to login if the route requires authentication but user is not logged in
    next("/login");
  } else {
    next();
  }
});

export default router;
