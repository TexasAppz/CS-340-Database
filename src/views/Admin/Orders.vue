<template>
    <div>
        <h1>{{ name }}</h1>
        <div style="width:800px; margin-left:50px;margin-top:40px">
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
            <b-table striped hover :items="data.orders" :fields="fields">
                <template v-slot:cell(Delete)="item">
                    <div>
                        <span
                            class="actionIcon deleteIcon"
                            @click="deleteItem(item.item)"
                        >
                            <font-awesome-icon icon="minus-circle" size="lg" />
                            <span>Delete</span>
                        </span>
                    </div>
                </template>
                <template v-slot:cell(Edit)="item">
                    <div>
                        <span
                            class="actionIcon editIcon"
                            @click="editItem(item.item)"
                        >
                            <font-awesome-icon icon="edit" size="lg" />
                            <span>Edit</span>
                        </span>
                    </div>
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
            name: 'Orders (Not Yet Picked Up)',
            fields: [
                'Edit',
                { key: 'order_id', label: 'Order Number' },
                { key: 'customerName', label: 'Customer Name' },
                { key: 'orderStatus', label: 'Status' },
                'Delete'
            ]
        };
    },
    computed: {
        data: function() {
            return dataService.getOpenOrders();
        }
    },
    methods: {
        deleteItem(item) {
            console.log(item);
        },
        editItem(item) {
            console.log(item);
        }
    }
};
</script>

<style>
.actionIcon:nth-child(1) {
    padding-right: 10px;
}
.deleteIcon {
    color: red;
    cursor: pointer;
}
.editIcon {
    color: indigo;
    cursor: pointer;
}
</style>
