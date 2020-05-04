<template>
    <div id="app">
        <b-navbar
            toggleable="lg"
            type="dark"
            variant="dark"
            class="navBarTextColor"
            style="margin-bottom: 20px;padding:10px"
        >
            <div style="padding-right:20px" class="clickable navBarTextHover">
                <div>
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
                <div>
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
                        <b-dropdown-item @click="gotoMenu(1)"
                            >Breakfast</b-dropdown-item
                        >
                        <b-dropdown-item @click="gotoMenu(2)"
                            >Lunch</b-dropdown-item
                        >
                        <b-dropdown-item @click="gotoMenu(3)"
                            >Dinner</b-dropdown-item
                        >
                    </b-nav-item-dropdown>
                </div>
            </div>

            <b-collapse id="nav-collapse" is-nav>
                <b-nav-form>
                    <b-form-input
                        size="sm"
                        class="mr-sm-2"
                        placeholder="Search"
                        id="searchInput"
                    ></b-form-input>
                    <b-button size="sm" class="my-2 my-sm-0" @click="doSearch"
                        >Search</b-button
                    >
                </b-nav-form>

                <div style="text-align:center;margin:auto">
                    <div style="display: inline-block">
                        <b-navbar-brand href="#">Momma's Place</b-navbar-brand>
                    </div>
                </div>
            </b-collapse>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <span style="padding-right:20px;padding-top:15px">
                    <span v-if="isLoggedIn" @click="doLogout" class="clickable">
                        Logout
                    </span>
                    <span>
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
                    <!--span v-else @click="gotoLogin" class="clickable">
                                Login
                            </span-->
                </span>

                <div
                    id="cartIconWithTotalItems"
                    class="clickable navBarTextHover"
                    style="padding-right: 20px"
                >
                    <div
                        class="p1 fa-stack has-badge"
                        :data-count="numItemsInCart"
                    >
                        <div>
                            <font-awesome-icon
                                icon="shopping-cart"
                                size="lg"
                                v-on:click="addToCart()"
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
import router from '@/router/index';

export default {
    name: 'main',
    data() {
        return {
            isLoggedIn: false
        };
    },
    computed: {
        numItemsInCart: function() {
            return store.getters.numItemsInCart;
        }
    },
    methods: {
        doLogout() {
            alert('Logged out...');
            this.isLoggedIn = !this.isLoggedIn;
        },
        gotoLogin() {
            router.push({ name: 'Login' }).catch(err => {});
        },
        goHome() {
            router.push({ name: 'Home' }).catch(err => {});
        },
        gotoMenu(id) {
            router.replace({ path: `/menu/${id}` }).catch(err => {});
        },
        doSearch() {
            alert(
                'Searching for... ' +
                    document.getElementById('searchInput').value
            );
        }
    },
    mounted: function() {
        if (store.state.customer) {
            this.isLoggedIn = true;
        } else {
            this.isLoggedIn = false;
        }
    },

    watch: {
        'store.state.customer': function() {
            if (store.state.customer) {
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
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
