import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

export const router: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/blog",
    name: "blog",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Blog.vue")
  },
  {
    path: "/blog/:id",
    name: "blogid",
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Post.vue")
  }
];

export default router;
