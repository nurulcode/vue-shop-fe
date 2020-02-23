import Vue from 'vue';
import Vuex from 'vuex';
import cart from './cart_store';
import alert from './alert_store';
import auth from './auth_store';
import dialog from './dialog_store';
import region from './region_store';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    prevUrl: ''
  },
  mutations: {
    setPrevUrl: (state, value) => {
      state.prevUrl = value;
    }
  },
  actions: {
    setPrevUrl: ({ commit }, value) => {
      commit('setPrevUrl', value);
    }
  },
  modules: {
    cart,
    alert,
    auth,
    dialog,
    region
  },
  getters: {
    prevUrl: state => state.prevUrl
  }
});
