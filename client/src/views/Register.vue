<template>
    <div class="wrapper">
        <form class="form-signin">
            <h2 class="form-signin-heading">Register Here</h2>
            <input
                type="text"
                class="form-control"
                name="name"
                placeholder="Name"
                required=""
                autofocus=""
                v-model="username"
            />

            <input
                type="text"
                class="form-control"
                name="email"
                placeholder="Email Address"
                required=""
                autofocus=""
                v-model="email"
            />

            <input
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                required=""
                v-model="password"
            />

            <input
                type="password"
                class="form-control"
                name="passwordAgain"
                placeholder="Enter Password Again"
                required=""
                v-model="password2"
            />

            <button
                class="btn btn-lg btn-primary2 btn-block"
                type="submit"
                @click="register($event)"
            >
                Register
            </button>
            <div v-for="err in errors" :key="err.status_code">
                <span>{{ err.message }}</span>
            </div>
        </form>
    </div>
</template>
<script>
import store from '@/store/index';
import router from '@/router/index';
import dataService from '../dataServices';

export default {
    name: 'Register',
    data() {
        return {
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: []
        };
    },
    methods: {
        register(e) {
            e.preventDefault();
            this.errors = [];
            if (this.formIsValid()) {
                let newCustomer = {
                    name: this.username,
                    email: this.email,
                    password: this.password
                };
                dataService.customers
                    .insertCustomer(newCustomer)
                    .then(result => {
                        let newCustomerObj = {
                            customer_id: result.customer_id,
                            name: this.username,
                            email: this.email,
                            password: this.password
                        };
                        store.dispatch('setCustomer', newCustomerObj);
                        store.dispatch('setUser', newCustomerObj);
                        router.push({ name: 'Home' });
                    });
            }
        },
        formIsValid() {
            if (this.password != this.password2) {
                this.errors.push({ message: 'The passwords do not match' });
                return false;
            }
            if (
                typeof this.username === 'undefined' ||
                this.username === null
            ) {
                console.log(1);
                this.errors.push({ message: 'Name is required' });
                return false;
            }
            if (this.username.length === 0) {
                console.log(2);
                this.errors.push({ message: 'Name is required' });
                return false;
            }
            if (typeof this.email === 'undefined' || this.email === null) {
                console.log(3);
                this.errors.push({ message: 'Email is required' });
                return false;
            }
            if (this.email.length === 0) {
                console.log(4);
                this.errors.push({ message: 'Email is required' });
                return false;
            }
            if (
                typeof this.password === 'undefined' ||
                this.password === null
            ) {
                console.log(5);
                this.errors.push({ message: 'Password is required' });
                return false;
            }
            if (this.password.length === 0) {
                console.log(6);
                this.errors.push({ message: 'Password is required' });
                return false;
            }
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
