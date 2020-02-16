export default {
  namespaced: true,
  state: {
    carts: []
  },
  mutations: {
    insert: (state, payload) => {
      state.carts.push({
        id: payload.id,
        title: payload.title,
        cover: payload.cover,
        price: payload.price,
        weight: payload.weight,
        quantity: 1
      });
    },
    update: (state, payload) => {
      let idx = state.carts.indexOf(payload);
      //
      state.carts.splice(idx, 1, {
        id: payload.id,
        title: payload.title,
        cover: payload.cover,
        price: payload.price,
        weight: payload.weight,
        quantity: payload.quantity
      });

      if (payload.quantity <= 0) {
        state.carts.splice(idx, 1);
      }
    }
  },
  actions: {
    add: ({ state, commit }, payload) => {
      // console.log(state);
      // apa data yang di input ada ?
      let cartItem = state.carts.find(item => item.id === payload.id);
      // if value false then run insert mutation
      if (!cartItem) {
        commit("insert", payload);
      } else {
        // if then run mutation update
        cartItem.quantity++;
        commit("update", cartItem);
      }
    }
  },
  getters: {
    carts: state => state.carts
  }
};
