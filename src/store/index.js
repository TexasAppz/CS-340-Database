import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

//import dataService from '../store/dataService';
/*eslint no-unused-vars: "off"*/

export default new Vuex.Store({
    state: {
        customer: null,
        cart: [],
        cartSummary: {
            subTotal: 0,
            tax: 0,
            grandTotal: 0
        }
    },
    getters: {
        numItemsInCart: function(state) {
            let totalItems = 0;
            let cart = state.cart;
            for (let i = 0; i < cart.length; ++i) {
                totalItems += cart[i].qty;
            }
            return totalItems;
        },
        currentCart: function(state) {
            return state.cart;
        },
        currentCartSummary: function(state) {
            state.cartSummary.subTotal = 0;
            for (let i = 0; i < state.cart.length; ++i) {
                state.cartSummary.subTotal +=
                    state.cart[i].qty * state.cart[i].price;
            }

            state.cartSummary.tax = state.cartSummary.subTotal * 0.075;
            state.cartSummary.grandTotal =
                state.cartSummary.subTotal + state.cartSummary.tax;

            return state.cartSummary;
        }
    },
    mutations: {
        ADD_TO_CART(state, payload) {
            let updated = false;
            for (let i = 0; i < state.cart.length; ++i) {
                if (state.cart[i].menuitem_id === payload.menuitem_id) {
                    state.cart[i].qty += payload.qty;
                    updated = true;
                }
            }

            if (!updated) {
                this.state.cart.push(payload);
            }
        },
        UPDATE_CART_ITEM(state, payload) {
            let updated = false;
            for (let i = 0; i < state.cart.length; ++i) {
                if (state.cart[i].menuitem_id === payload.menuitem_id) {
                    state.cart[i].qty = payload.qty;
                }
            }
        },
        UPDATE_CART_SUMMARY(state) {
            state.cartSummary.subTotal = 0;
            for (let i = 0; i < state.cart.length; ++i) {
                state.cartSummary.subTotal +=
                    state.cart[i].qty * state.cart[i].price;
            }

            state.cartSummary.tax = state.cartSummary.subTotal * 0.075;
            state.cartSummary.grandTotal =
                state.cartSummary.subTotal + state.cartSummary.tax;
        }
    },
    actions: {
        addToCart(context, payload) {
            //TODO: Add to the database as well
            context.commit('ADD_TO_CART', payload);
            context.commit('UPDATE_CART_SUMMARY');
        },
        updateCartItem(context, payload) {
            //TODO: Add to the database as well

            context.commit('UPDATE_CART_ITEM', payload);
            context.commit('UPDATE_CART_SUMMARY');
        }
    },
    modules: {}
});
