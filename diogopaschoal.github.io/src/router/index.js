import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/experiences",
    name: "Experiences",
    component: () =>
      import(/* webpackChunkName: "experiences" */ "../views/Experiences.vue"),
  },
  {
    path: "/apps",
    name: "Apps",
    component: () => import(/* webpackChunkName: "apps" */ "../views/Apps.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/blog",
    name: "Blog",
    component: () => import(/* webpackChunkName: "blog" */ "../views/Blog.vue"),
  },
  {
    path: "/blog/:slug",
    name: "Post",
    props: true,
    component: () => import(/* webpackChunkName: "blog" */ "../views/Post.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
