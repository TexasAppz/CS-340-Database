import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import dataService from '../store/dataService';
/*eslint no-unused-vars: "off"*/

export default new Vuex.Store({
    showCartIcon: true,
    state: {
        order_id: null,
        customer: null,
        cart: [],
        cartSummary: {
            subTotal: 0,
            tax: 0,
            grandTotal: 0
        }
    },
    getters: {
        showCartIcon: function(state) {
            return state.showCartIcon;
        },
        customer: function(state) {
            return state.customer;
        },
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
        UPDATE_SHOWCARTICON(state, payload) {
            state.showCartIcon = payload;
        },
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
        REMOVE_FROM_CART(state, payload) {
            for (let i = 0; i < state.cart.length; ++i) {
                if (state.cart[i].menuitem_id === payload.menuitem_id) {
                    state.cart.splice(i, 1);
                }
            }
        },
        UPDATE_CART_ITEM(state, payload) {
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
        },
        SET_CURRENT_CUSTOMER(state, payload) {
            state.customer = payload;
        },
        SET_CURRENT_ORDER_ID(state, payload) {
            state.order_id = payload;
        },
        SET_FULL_CART(state, payload) {
            state.cart = payload;
        }
    },
    actions: {
        setShowCartIcon(context, payload) {
            context.commit('UPDATE_SHOWCARTICON', payload);
        },
        addToCart(context, payload) {
            //TODO: Add to the database as well
            context.commit('ADD_TO_CART', payload);
            context.commit('UPDATE_CART_SUMMARY');
        },
        removeFromCart(context, payload) {
            //TODO: Add to the database as well
            context.commit('REMOVE_FROM_CART', payload);
            context.commit('UPDATE_CART_SUMMARY');
        },
        updateCartItem(context, payload) {
            //TODO: Add to the database as well
            context.commit('UPDATE_CART_ITEM', payload);
            context.commit('UPDATE_CART_SUMMARY');
        },
        setCustomer(context, payload) {
            context.commit('SET_CURRENT_CUSTOMER', payload);
        },
        setOrder(context, payload) {
            let thisOrder = dataService.getOrder();
            context.commit('SET_CURRENT_ORDER_ID', thisOrder.order_id);
            context.commit('SET_CURRENT_CUSTOMER', thisOrder.customer);
            context.commit('SET_FULL_CART', thisOrder.order_items);
            context.commit('UPDATE_CART_SUMMARY');
        }
    }
});
