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
            />

            <input
                type="text"
                class="form-control"
                name="email"
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

            <input
                type="password"
                class="form-control"
                name="passwordAgain"
                placeholder="Enter Password Again"
                required=""
            />

            <button class="btn btn-lg btn-primary2 btn-block" type="submit">
                Register
            </button>
        </form>
    </div>
</template>
<script>
export default {
    name: 'Register'
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
