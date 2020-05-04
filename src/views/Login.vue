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
            />
            <input
                type="password"
                class="form-control"
                name="password"
                placeholder="Password"
                required=""
            />
            <label class="checkbox">
                <input
                    type="checkbox"
                    value="remember-me"
                    id="rememberMe"
                    name="rememberMe"
                />
                Forgot Password?
            </label>
            <button class="btn btn-lg btn-primary2 btn-block" type="submit">
                Login
            </button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            form: {
                email: '',
                name: '',
                food: null,
                checked: []
            },
            foods: [
                { text: 'Select One', value: null },
                'Carrots',
                'Beans',
                'Tomatoes',
                'Corn'
            ],
            show: true
        };
    }
};
</script>
<style scoped>
.test {
    color: red;
}
</style>
<style scoped>
body {
    background: #eee !important;
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
.form-signin-heading,
.checkbox {
    margin-bottom: 30px;
}

.checkbox {
    font-weight: normal;
}

.form-control {
    position: relative;
    font-size: 16px;
    height: auto;
    padding: 10px;

    /*  This project is not configured to used Sass or Less 
        as a style sheet rule preprocesor
        
        @include box-sizing(border-box);

        &:focus {
            z-index: 2;
        }
    */
}

input[type='text'] {
    margin-bottom: -1px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

input[type='password'] {
    margin-bottom: 20px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.btn-primary2 {
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
}
/* ======= */
.test {
    color: red;
}
</style>
<style>
.test {
    color: #cccccc;
}
</style>
