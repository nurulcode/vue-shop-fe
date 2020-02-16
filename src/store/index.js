import Vue from "vue";
import Vuex from "vuex";
import cart from "./cart_store";
import alert from "./alert_store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    alert
  },
  getters: {}
});
