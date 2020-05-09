<template>
    <!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_sidenav_fixed -->
    <div>
        <div class="sidenav">
            <router-link :to="{ name: 'AdminOrders' }">Orders</router-link>
            <router-link :to="{ name: 'AdminMenus' }">Menus</router-link>
            <router-link :to="{ name: 'AdminMenuItems' }"
                >Menu Items</router-link
            >
            <router-link :to="{ name: 'AdminIngredients' }"
                >Ingredients</router-link
            >
            <router-link :to="{ name: 'AdminAccounts' }">Accounts</router-link>
        </div>
        <div class="main">
            <router-view />
        </div>
    </div>
</template>

<style>
.sidenav {
    height: 100%;
    width: 150px;
    position: fixed;
    z-index: 1;
    top: 84;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
}

.sidenav a {
    padding: 6px 8px 16px 16px;
    text-decoration: none;
    font-size: 18px;
    color: #818181;
    display: block;
}

.sidenav a:hover {
    color: #f1f1f1;
}

.main {
    margin-left: 160px; /* Same as the width of the sidenav */
    padding: 0px 10px;
    padding-top: 20px;
    text-align: left;
}

@media screen and (max-height: 450px) {
    .sidenav {
        padding-top: 15px;
    }
    .sidenav a {
        font-size: 18px;
    }
}
</style>
