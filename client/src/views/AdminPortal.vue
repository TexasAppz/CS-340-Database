<template>
    <!-- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_sidenav_fixed -->
    <div>
        <div class="sidenav">
            <router-link :to="{ name: 'AdminOrders' }">
                <font-awesome-icon icon="shopping-cart" size="lg" />
                Orders
            </router-link>
            <router-link :to="{ name: 'AdminMenus' }">
                <font-awesome-icon icon="list-alt" size="lg" />
                Menus
            </router-link>
            <router-link :to="{ name: 'AdminMenuItems' }">
                <font-awesome-icon icon="list-ul" size="lg" />
                Menu Items
            </router-link>
            <router-link :to="{ name: 'AdminIngredients' }">
                <font-awesome-icon icon="check-square" size="lg" />
                Ingredients
            </router-link>
            <router-link :to="{ name: 'AdminAccounts' }">
                <font-awesome-icon icon="users" size="lg" />
                Accounts
            </router-link>
        </div>
        <div class="main">
            <router-view />
        </div>
    </div>
</template>

<style>
.sidenav {
    height: 100%;
    width: 180px;
    position: fixed;
    z-index: 1;
    top: 84;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    padding-top: 20px;
}

.sidenav a {
    padding: 6px 8px 20px 16px;
    margin-top: 20px;
    text-decoration: none;
    font-size: 18px;
    color: #818181;
    display: block;
}

.sidenav a:hover {
    color: #f1f1f1;
    text-decoration: none;
}

.main {
    margin-left: 200px; /* Same as the width of the sidenav */
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
