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
            <b-button v-b-modal.modal-1>Example Edit Form</b-button>

            <b-modal id="modal-1" title="Edit Menu Name">
                <b-form>
                    <b-form-input
                        id="input-1"
                        type="text"
                        required
                        placeholder="Breakfast"
                    ></b-form-input
                ></b-form>
            </b-modal>
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
            name: 'Menus',
            fields: ['Edit', { key: 'name', label: 'Menu Name' }, 'Delete']
        };
    },
    computed: {
        data: function() {
            return dataService.getMenus();
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
