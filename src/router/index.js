import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Menu from '../views/Menu.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import Cart from '../views/Cart.vue';
import AdminPortal from '../views/AdminPortal.vue';

import AdminHome from '../views/Admin/Home.vue';
import AdminOrders from '../views/Admin/Orders.vue';
import AdminMenus from '../views/Admin/Menus.vue';
import AdminMenuItems from '../views/Admin/MenuItems.vue';
import AdminIngredients from '../views/Admin/Ingredients.vue';
import AdminAccounts from '../views/Admin/Accounts.vue';

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

export default router;
