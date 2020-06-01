<template>
    <div>
        <h1>{{ name }}</h1>
        <div style="width:90%; margin-left:50px;margin-top:40px">
            <div>
                <span
                    style="float:right;margin-right:40px;padding-bottom:10px;cursor:pointer"
                >
                    <font-awesome-icon
                        icon="plus-circle"
                        size="lg"
                        style="color:green"
                        v-b-modal.modal-1
                    />
                    <span> Add New</span>
                </span>
            </div>
            <b-table striped hover :items="openOrders" :fields="fields">
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
        <div>
            <b-modal id="modal-1" title="New Order Form" @ok="OkClicked()">
                <b-form>
                    <span>Customer Name</span>
                    <b-form-select
                        v-model="selectedCustomer"
                        :options="customers"
                        style="margin-right:10px"
                    ></b-form-select
                ></b-form>
            </b-modal>
        </div>
    </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/

// import store from '@/store/index';
import router from '@/router/index';
import dataService from '../../dataServices';

export default {
    data() {
        //view model
        return {
            openOrders: [],
            name: 'Orders (Not Yet Picked Up)',
            selectedCustomer: null,
            customers: [],
            fields: [
                'Edit',
                { key: 'order_id', label: 'Order Number' },
                { key: 'customerName', label: 'Customer Name' },
                { key: 'status', label: 'Status' },
                'Delete'
            ]
        };
    },
    methods: {
        deleteItem(item) {
            alert('Order number ' + item.order_id + ' would be deleted');
            console.log(item);
        },
        editItem(item) {
            router
                .replace({ path: `/Admin/OrderDetails/${item.order_id}` })
                .catch(err => {});
        },
        getCustomers() {
            dataService.customers.getAccounts().then(data => {
                let rtn = [];
                for (let i = 0; i < data.length; i++) {
                    rtn.push({
                        text: data[i].name,
                        value: data[i]
                    });
                }
                this.customers = rtn;
            });
        },
        getOpenOrders() {
            dataService.orders.getOpenOrders().then(result => {
                this.openOrders = result;
            });
        },
        OkClicked() {
            if (this.selectedCustomer) {
                dataService.orders
                    .createNewOrderForCustomer(this.selectedCustomer)
                    .then(() => {
                        this.getOpenOrders();
                    });
            }
        }
    },
    mounted() {
        this.getOpenOrders();
        this.getCustomers();
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
