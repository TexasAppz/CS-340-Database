<template>
    <div :key="componentKey">
        <h1>{{ name }}</h1>
        <div style="width:600px; margin-left:50px;margin-top:40px">
            <div>
                <span
                    style="float:right;margin-right:40px;padding-bottom:10px;cursor:pointer"
                >
                    <font-awesome-icon
                        icon="plus-circle"
                        size="lg"
                        style="color:green"
                        @click="showModalForm()"
                    />
                    <span> Add New</span>
                </span>
            </div>
            <b-table striped hover :items="accounts" :fields="fields">
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
        <b-modal id="modalForm1" :title="formTitle" @ok="OkClicked()">
            <b-form>
                <b-form-input
                    id="name"
                    type="text"
                    required
                    v-model="selectedItem.name"
                    placeholder="Name"
                    style="margin:8px;"
                ></b-form-input>
                <b-form-input
                    id="email"
                    type="text"
                    required
                    v-model="selectedItem.email"
                    placeholder="Email"
                    style="margin:8px;"
                ></b-form-input>
            </b-form>
        </b-modal>
    </div>
</template>

<script>
// import store from '@/store/index';
//import router from '@/router/index';
import dataService from '../../store/dataService';

export default {
    data() {
        //view model
        return {
            accounts: [],
            componentKey: 0,
            selectedItem: {},
            formTitle: '',
            name: 'Account Profiles',
            fields: [
                'Edit',
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                'Delete'
            ]
        };
    },
    mounted() {
        this.getAccounts();
    },
    methods: {
        getAccounts() {
            dataService.getAccounts().then(result => {
                this.accounts = result;
            });
        },
        deleteItem(item) {
            alert(item.name + ' would be deleted');
        },
        editItem(item) {
            this.selectedItem = item;
            this.formTitle = 'Edit Account Info';
            this.$bvModal.show('modalForm1');
        },
        showModalForm() {
            this.selectedItem = {};
            this.formTitle = 'Add New Account';
            this.$bvModal.show('modalForm1');
        },
        OkClicked() {
            if (this.selectedItem.customer_id !== undefined) {
                alert('Editing not yet implimented');
            } else {
                let newCustomer = {
                    name: this.selectedItem.name,
                    email: this.selectedItem.email,
                    password: 'default'
                };

                dataService.insertCustomer(newCustomer).then(result => {
                    console.log(result);
                    this.getAccounts();
                });
            }
        }
    }
};
</script>
