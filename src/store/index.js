import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//import dataService from '../store/dataService';

export default new Vuex.Store({
    state: {
        customer: null,
        cart: []
    },
    getters: {
        numItemsInCart: function(state) {
            let totalItems = 0;
            let cart = state.cart;
            for (let i = 0; i < cart.length; ++i) {
                totalItems += cart[i].qty;
            }
            return totalItems;
        }
    },
    mutations: {
        addToCart(state, payload) {
            this.state.cart.push(payload);
        }
    },
    actions: {
        addToCart(context, payload) {
            context.commit('addToCart', payload);
            //TODO: Add to the database as well
        }
    },
    modules: {}
});
