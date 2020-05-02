import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//import dataService from '../store/dataService';

export default new Vuex.Store({
    state: {
        customer: 0,
        cart: {}
    },
    getters: {},
    mutations: {},
    actions: {
        updateCart(context, payload) {
            console.log(payload);
        }
    },
    modules: {}
});
