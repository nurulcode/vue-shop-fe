import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // ! route level code-splitting
    // * this generates a separate chunk (about.[hash].js) for this route
    // ?  which is lazy-loaded when the route is visited.
    // TODO route level code-splitting

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/categories",
    name: "categories",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Categories.vue")
  },
  {
    path: "/books",
    name: "books",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Books.vue")
  },
  {
    path: "/book/:slug",
    name: "book",

    component: () => import(/* webpackChunkName: "about" */ "../views/Book.vue")
  },
  {
    path: "/category/:slug",
    name: "category",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Category.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
