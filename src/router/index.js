import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // ! route level code-splitting
    // * this generates a separate chunk (about.[hash].js) for this route
    // ?  which is lazy-loaded when the route is visited.
    // TODO route level code-splitting

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/categories',
    name: 'categories',

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Categories.vue')
  },
  {
    path: '/books',
    name: 'books',

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Books.vue')
  },
  {
    path: '/book/:slug',
    name: 'book',

    component: () => import(/* webpackChunkName: "about" */ '../views/Book.vue')
  },
  {
    path: '/category/:slug',
    name: 'category',

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Category.vue')
  },
  {
    path: '/checkout',
    name: 'checkout',

    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Checkout.vue'),
    meta: { auth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (store.getters['auth/guest']) {
      store.dispatch('alert/set', {
        status: true,
        text: 'login dulu',
        color: 'error'
      });

      if (store.getters['cart/count'] == 0) {
        store.dispatch('setPrevUrl', '/');
        store.dispatch('dialog/setComponent', 'login');
        store.dispatch('dialog/setStatus', true);
      } else {
        store.dispatch('setPrevUrl', to.path);
        store.dispatch('dialog/setComponent', 'login');
        store.dispatch('dialog/setStatus', true);
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
