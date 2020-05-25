<template>
    <div>
        <b-navbar
            toggleable="lg"
            type="dark"
            variant="dark"
            class="navBarTextColor"
            style="padding:10px"
        >
            <div style="padding-right:20px" class="clickable navBarTextHover">
                <div style="text-align: center;">
                    <font-awesome-icon
                        icon="home"
                        size="lg"
                        v-on:click="goHome()"
                    />
                </div>
                <div>Home</div>
            </div>
            <div
                style="padding-right:20px;display: inline-block"
                class="clickable navBarTextHover"
            >
                <div style="text-align: center;">
                    <font-awesome-icon
                        icon="utensils"
                        size="lg"
                        v-on:click="gotoMenu(1)"
                        alt="Menu Page"
                    />
                </div>
                <div>
                    <b-nav-item-dropdown
                        id="my-nav-dropdown"
                        text="Menus"
                        toggle-class="nav-link-custom navBarTextHover"
                        right
                        style="list-style: none;"
                    >
                        <div v-for="item in menus" :key="item.menu_id">
                            <b-dropdown-item @click="gotoMenu(item.menu_id)"
                                >{{ item.name }}
                            </b-dropdown-item>
                        </div>
                    </b-nav-item-dropdown>
                </div>
            </div>

            <b-collapse id="nav-collapse" is-nav>
                <b-nav-form>
                    <b-form-input
                        size="sm"
                        class="mr-sm-2"
                        placeholder="Search Menus"
                        id="searchInput"
                    ></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" @click="doSearch"
                        >Search</b-button
                    >
                </b-nav-form>

                <div style="text-align:center;margin:auto">
                    <div style="display: inline-block">
                        <b-navbar-brand href="#">
                            <span>Momma's Place </span>
                        </b-navbar-brand>
                    </div>
                </div>
            </b-collapse>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <span style="padding-right:20px;padding-top:15px">
                    <span v-show="isLoggedIn"
                        >Logged in as: {{ currentUser }} |
                    </span>
                    <span v-show="isLoggedIn" @click="logout" class="clickable">
                        Logout
                    </span>
                    <span v-if="!isLoggedIn">
                        <router-link
                            class="navBarTextColor navBarTextHover"
                            to="/Login"
                            >Login</router-link
                        >
                        |
                        <router-link
                            class="navBarTextColor navBarTextHover"
                            to="/Register"
                            >Register</router-link
                        >
                    </span>
                    <span v-show="showCartIcon">
                        |
                        <router-link
                            class="navBarTextColor navBarTextHover"
                            to="/Admin"
                            >Admin Portal</router-link
                        >
                    </span>
                </span>
                <div
                    id="cartIconWithTotalItems"
                    class="clickable navBarTextHover"
                    style="padding-right: 20px"
                    v-show="showCartIcon"
                >
                    <div
                        class="p1 fa-stack has-badge"
                        :data-count="numItemsInCart"
                    >
                        <div>
                            <font-awesome-icon
                                icon="shopping-cart"
                                size="lg"
                                v-on:click="gotoCart()"
                            />
                        </div>
                        <div>
                            Cart
                        </div>
                    </div>
                </div>
            </b-navbar-nav>
        </b-navbar>

        <router-view />
    </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/

import store from '@/store/index';
import { mapState } from 'vuex';
import router from '@/router/index';
import dataService from './store/dataService';

export default {
    //name: 'main',
    data() {
        return {
            isLoggedIn: false
        };
    },
    computed: {
        numItemsInCart() {
            return store.getters.numItemsInCart;
        },
        currentUser() {
            if (this.isLoggedIn) {
                return store.state.user.name;
            }
            return '';
        },
        showCartIcon() {
            return store.state.showCartIcon;
        }
    },
    asyncComputed: {
        menus() {
            return dataService.getMenus();
        }
    },
    methods: {
        gotoLogin() {
            router.push({ name: 'Login' }).catch(err => {});
        },
        goHome() {
            router.push({ name: 'Home' }).catch(err => {});
        },
        gotoCart() {
            router.push({ name: 'Cart' }).catch(err => {});
        },
        gotoMenu(id) {
            router.replace({ path: `/menu/${id}` }).catch(err => {});
        },
        gotoAdminPortal() {
            router.replace({ path: `/Admin/Orders` }).catch(err => {});
        },
        doSearch() {
            alert(
                'Searching for... ' +
                    document.getElementById('searchInput').value
            );
        },
        logout() {
            let userCredentials = null;
            store.dispatch('setUser', userCredentials);
            store.dispatch('setCustomer', userCredentials);
            router.push({ name: 'Home' }).catch(err => {});
        }
    },
    mounted: function() {
        if (store.state.user) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    },

    watch: {
        '$store.state.user': function() {
            if (store.state.user) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        },
        '$store.state.showCartIcon': function() {
            if (store.state.showCartIcon) {
                this.showCartIcon = true;
            } else {
                this.showCartIcon = false;
            }
        }
    }
};
</script>

<style>
.clickable {
    cursor: pointer;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#my-nav-dropdown > a {
    color: rgb(224, 220, 220);
}

.navBarTextColor {
    color: rgb(224, 220, 220);
}

.navBarTextHover:hover {
    color: rgb(234, 241, 165);
    text-decoration: none;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

#cartIconWithTotalItems .p1[data-count]:after {
    position: absolute;
    right: 5%;
    top: -10%;
    content: attr(data-count);
    font-size: 70%;
    padding: 0.3em;
    border-radius: 50%;
    line-height: 1em;
    color: white;
    background: rgba(255, 0, 0, 0.85);
    text-align: center;
    min-width: 1em;
}

.tooltip {
    position: relative;
    display: inline-block;
    border-bottom: 1px dotted black;
}

.tooltip .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
}

.tooltip:hover .tooltiptext {
    visibility: visible;
}
</style>
