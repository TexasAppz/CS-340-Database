import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Menu from '../views/Menu.vue';
import Search from '../views/SearchResults.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Cart from '../views/Cart.vue';
import AdminPortal from '../views/AdminPortal.vue';

import AdminHome from '../views/Admin/Home.vue';
import AdminOrders from '../views/Admin/Orders.vue';
import AdminOrderDetails from '../views/Admin/OrderDetails.vue';
import AdminMenus from '../views/Admin/Menus.vue';
import AdminMenuItems from '../views/Admin/MenuItems.vue';
import AdminIngredients from '../views/Admin/Ingredients.vue';
import AdminAccounts from '../views/Admin/Accounts.vue';

import store from '@/store/index';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Menu',
        name: 'Menu',
        component: Menu
    },
    {
        path: '/Menu/SearchResults/:phrase',
        name: 'Search',
        component: Search
    },
    {
        path: '/Menu/:id',
        name: 'MenuWithId',
        component: Menu
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Register',
        name: 'Register',
        component: Register
    },
    {
        path: '/Cart',
        name: 'Cart',
        component: Cart
    },
    {
        path: '/Admin',
        component: AdminPortal,
        children: [
            {
                path: '/',
                name: 'AdminHome',
                component: AdminHome
            },
            {
                path: 'Orders',
                name: 'AdminOrders',
                component: AdminOrders
            },
            {
                path: 'OrderDetails/:id',
                name: 'AdminOrderDetails',
                component: AdminOrderDetails
            },
            {
                path: 'Menus',
                name: 'AdminMenus',
                component: AdminMenus
            },
            {
                path: 'MenuItems',
                name: 'AdminMenuItems',
                component: AdminMenuItems
            },
            {
                path: 'Ingredients',
                name: 'AdminIngredients',
                component: AdminIngredients
            },
            {
                path: 'Accounts',
                name: 'AdminAccounts',
                component: AdminAccounts
            }
        ]
    }
];

const router = new VueRouter({
    //mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched[0].path === '/Admin') {
        store.dispatch('setShowCartIcon', false);
    } else {
        store.dispatch('setShowCartIcon', true);
    }
    next();
});

export default router;
