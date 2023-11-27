import { createRouter, createWebHashHistory } from "vue-router";
const Login = () => import("@/views/auth/Login.vue");
const Index = () => import("@/views/Index.vue");
const Dashboard = () => import("@/views/Dashboard.vue");
const User = () => import("@/views/user/Index.vue");
const Kelas = () => import("@/views/kelas/Index.vue");
const Mapel = () => import("@/views/mapel/Index.vue");

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        // guestRequired: true,
      },
    },
    {
      path: "/",
      component: Index,
      redirect: { path: "/dashboard" },
      meta: {
        // authRequired: true,
      },
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "/user",
          name: "user",
          component: User,
        },
        {
          path: "/user/create",
          name: "user-create",
          component: () => import("@/views/user/Create.vue"),
        },
        {
          path: "/user/edit",
          name: "user-edit",
          component: () => import("@/views/user/Edit.vue"),
        },
        {
          path: "/kelas",
          name: "kelas",
          component: Kelas,
        },
        {
          path: "/kelas/create",
          name: "kelas-create",
          component: () => import("@/views/kelas/Create.vue"),
        },
        {
          path: "/kelas/edit",
          name: "kelas-edit",
          component: () => import("@/views/kelas/Edit.vue"),
        },
        {
          path: "/mapel",
          name: "mapel",
          component: Mapel,
        },
        {
          path: "/mapel/create",
          name: "mapel-create",
          component: () => import("@/views/mapel/Create.vue"),
        },
        {
          path: "/mapel/edit",
          name: "mapel-edit",
          component: () => import("@/views/mapel/Edit.vue"),
        },
      ],
    },
  ],
});

export default router;
