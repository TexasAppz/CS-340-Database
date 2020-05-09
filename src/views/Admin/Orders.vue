<template>
    <div>
        <h1>{{ name }}</h1>
        <div style="width:600px; margin-left:50px;margin-top:40px">
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
                <template v-slot:cell(Action)="item">
                    <div>
                        <span class="actionIcon editIcon">
                            <font-awesome-icon icon="edit" size="lg" />
                            <span>Edit</span>
                        </span>
                        <span class="actionIcon deleteIcon">
                            <font-awesome-icon icon="minus-circle" size="lg" />
                            <span>Delete</span>
                        </span>
                        <span style="display:none">{{ item }}</span>
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
                { key: 'order_id', label: 'Order Number' },
                { key: 'customerName', label: 'Customer Name' },
                { key: 'orderStatus', label: 'Status' },
                'Action'
            ]
        };
    },
    computed: {
        data: function() {
            return dataService.getOpenOrders();
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
}
.editIcon {
    color: indigo;
}
</style>
