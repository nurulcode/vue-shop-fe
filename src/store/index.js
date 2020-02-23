import Vue from 'vue';
import Vuex from 'vuex';
import cart from './cart_store';
import alert from './alert_store';
import auth from './auth_store';
import dialog from './dialog_store';
import region from './region_store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    alert,
    auth,
    dialog,
    region
  },
  getters: {}
});
