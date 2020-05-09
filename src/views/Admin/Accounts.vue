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
            <b-table striped hover :items="data.accounts" :fields="fields">
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
            name: 'Account Profiles',
            fields: [
                'Edit',
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                'Delete'
            ]
        };
    },
    computed: {
        data: function() {
            return dataService.getAccounts();
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
