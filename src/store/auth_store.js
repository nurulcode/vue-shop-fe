export default {
  namespaces: true,
  state: {
    user: {}
  },
  mutations: {
    set: (state, payload) => {
      console.log('ini payload di auth_store', payload);
      state.user = payload;
    }
  },
  actions: {
    set: ({ commit }, payload) => {
      console.log('ini commit di auth_store', commit);
      commit('set', payload);
    }
  },
  getters: {
    user: state => state.user,
    //  jika tidak ada tamu
    guest: state => Object.keys(state.user).length === 0
  }
};
