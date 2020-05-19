import Vue from 'vue';
import AsyncComputed from 'vue-async-computed';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCartPlus,
    faShoppingCart,
    faHome,
    faUtensils,
    faMinusCircle,
    faDatabase,
    faEdit,
    faPlusCircle,
    faListAlt,
    faListUl,
    faCheckSquare,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

library.add(faCartPlus);
library.add(faShoppingCart);
library.add(faHome);
library.add(faUtensils);
library.add(faMinusCircle);
library.add(faDatabase);
library.add(faEdit);
library.add(faPlusCircle);
library.add(faListAlt);
library.add(faListUl);
library.add(faCheckSquare);
library.add(faUsers);

Vue.use(BootstrapVue);
Vue.use(AsyncComputed);
Vue.component('font-awesome-icon', FontAwesomeIcon);

//Global Components
import MenuItemCard from './components/MenuItemCard.vue';
Vue.component('menu-item-card', MenuItemCard);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
