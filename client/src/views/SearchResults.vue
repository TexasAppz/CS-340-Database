<template>
    <div id="menu">
        <div style="text-align:center;margin:10px">
            <h1>{{ entireMenu.name }} Results for {{ searchPhrase }}</h1>
        </div>

        <div style="width:800px; margin: 0 auto">
            <div v-for="item in entireMenu.items" :key="item.menu_item_id">
                <menu-item-card v-bind:menu-item="item"></menu-item-card>
            </div>
        </div>
    </div>
</template>

<script>
import dataService from '../dataServices';

export default {
    data() {
        return {
            menuName: '',
            thisMenuId: this.$route.params.id,
            searchPhrase: this.$route.params.phrase
        };
    },
    asyncComputed: {
        entireMenu: {
            get() {
                return dataService.menus.getMenuSearch(
                    this.$route.params.phrase
                );
            },
            default: { name: '' }
        }
    }
};
</script>

<style>
.menu-item {
    padding-bottom: 20px;
    width: 500px;
    margin: 0 auto;
}

.menu-item-card {
    margin: 40px;
}
.menu-item-icon {
    background-color: grey;
    width: 70px;
    float: left;
}
.menu-item-name {
    background-color: lightgrey;
    width: 400px;
    float: left;
}
.cartIcon {
    margin: 20px auto;
    cursor: pointer;
}
.cartIcon:active {
    color: darkgoldenrod;
}
</style>
