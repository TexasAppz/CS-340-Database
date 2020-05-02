import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Menu from '../views/Menu.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

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
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
