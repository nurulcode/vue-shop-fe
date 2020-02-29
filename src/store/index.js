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
    prevUrl: '',
    payment: []
  },
  mutations: {
    setPrevUrl: (state, value) => {
      state.prevUrl = value;
    },
    setPayment: (state, value) => {
      state.payment = value;
    }
  },
  actions: {
    setPrevUrl: ({ commit }, value) => {
      commit('setPrevUrl', value);
    },
    setPayment: ({ commit }, value) => {
      commit('setPayment', value);
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
    prevUrl: state => state.prevUrl,
    payment: state => state.payment
  }
});
