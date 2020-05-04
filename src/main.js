import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faCartPlus,
    faShoppingCart,
    faHome,
    faUtensils
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

library.add(faCartPlus);
library.add(faShoppingCart);
library.add(faHome);
library.add(faUtensils);

Vue.use(BootstrapVue);

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
