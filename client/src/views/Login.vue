<template>
    <div class="wrapper">
        <form class="form-signin">
            <h2 class="form-signin-heading">Login</h2>
            <input
                type="text"
                class="form-control"
                name="username"
                placeholder="Email Address"
                required=""
                autofocus=""
                v-model="username"
            />
            <input
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                required=""
                v-model="password"
            />
            <button
                class="btn btn-lg btn-primary2 btn-block"
                type="submit"
                @click="login($event)"
            >
                Login
            </button>
            <div v-for="err in errors" :key="err.status_code">
                <span>{{ err.message }}</span>
            </div>
        </form>
    </div>
</template>
<script>
/*eslint no-unused-vars: "off"*/

import store from '@/store/index';
import router from '@/router/index';
import dataService from '../dataServices';

export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            rememberme: '',
            errors: []
        };
    },
    methods: {
        login(e) {
            e.preventDefault();
            if (this.formIsValid()) {
                dataService.customers.login(this.username).then(result => {
                    if (result.customer_id != undefined) {
                        if (result.password === this.password) {
                            store.dispatch('setCustomer', result);
                            store.dispatch('setUser', result);
                            router.push({ name: 'Home' }).catch(err => {});
                        } else {
                            this.errors = [];
                            this.errors.push({
                                message: 'Username or Password is incorrect'
                            });
                        }
                    } else {
                        if (result.status_code === '100') {
                            this.errors = [];
                            this.errors.push({
                                message: 'Username or Password is incorrect'
                            });
                        }
                    }
                });
            }

            store.dispatch('setCustomer', null);
            store.dispatch('setUser', null);
        },
        formIsValid() {
            return true;
        }
    }
};
</script>
<style scoped>
button {
    margin-top: 20px;
}
.wrapper {
    margin-top: 80px;
    margin-bottom: 80px;
}

.form-signin {
    max-width: 380px;
    padding: 15px 35px 45px;
    margin: 0 auto;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.form-control {
    font-size: 16px;
    margin-top: 10px;
}

.btn-primary2 {
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
}
</style>
