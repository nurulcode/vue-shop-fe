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
      // membandingkan nilai indexOf
      let idx = state.carts.indexOf(payload);
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
    },

    set: (state, playload) => {
      state.carts = playload;
    }
  },
  actions: {
    // tambah cart
    add: ({ state, commit }, payload) => {
      // console.log(state);
      // apa data yang di tambah ada ?
      let cartItem = state.carts.find(item => item.id === payload.id);
      // if value false then run insert mutation
      if (!cartItem) {
        commit('insert', payload);
      } else {
        // if then run mutation update
        cartItem.quantity++;
        commit('update', cartItem);
      }
    },

    // menghapus cart
    remove: ({ state, commit }, playload) => {
      let cartItem = state.carts.find(item => item.id === playload.id);
      if (cartItem) {
        cartItem.quantity--;
        commit('update', cartItem);
      }
    },
    // update cart
    set: ({ commit }, playload) => {
      commit('set', playload);
    }
  },
  getters: {
    carts: state => state.carts,
    count: state => {
      return state.carts.length;
    },
    totalPrice: state => {
      let total = 0;
      state.carts.forEach(cart => {
        total += cart.price * cart.quantity;
      });
      return total;
    },
    totalQuantity: state => {
      let total = 0;
      state.carts.forEach(cart => {
        total += cart.quantity;
      });
      return total;
    },
    totalWeight: state => {
      let total = 0;
      state.carts.forEach(cart => {
        total += cart.weight;
      });
      return total;
    }
  }
};
