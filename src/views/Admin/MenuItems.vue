<template>
    <div>
        <h1>{{ name }}</h1>
        <div style="width:400px; margin-left:50px;margin-top:40px">
            <div>
                <span style="float:right;margin-right:40px;padding-bottom:10px">
                    <font-awesome-icon
                        icon="plus-circle"
                        size="lg"
                        style="color:green"
                    />
                    <span> Add New</span>
                </span>
            </div>
            <b-table striped hover :items="data.menus" :fields="fields">
                <template v-slot:cell(Action)="item">
                    <font-awesome-icon icon="edit" size="lg" />
                    <span style="padding-left:6px;"></span>
                    <font-awesome-icon icon="minus-circle" size="lg" />
                    <span style="display:none">{{ item }}</span>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
// import store from '@/store/index';
// import router from '@/router/index';
import dataService from '../../store/dataService';

export default {
    data() {
        //view model
        return {
            name: 'Menu Items',
            fields: [{ key: 'name', label: 'Item Name' }, 'Action']
        };
    },
    computed: {
        data: function() {
            return dataService.getMenuItems();
        }
    }
};
</script>
