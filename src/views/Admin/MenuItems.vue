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
            <b-table striped hover :items="data.menuItems" :fields="fields">
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
            <b-button v-b-modal.modal-1 @click="getMenuItemIngredients()">
                Edit Form</b-button
            >
            <b-modal id="modal-1" title="Edit Menu Item Name">
                <b-form>
                    <b-form-input
                        id="input-1"
                        type="text"
                        required
                        placeholder="Pancakes"
                    ></b-form-input>
                    <br />
                    <div>
                        <b-form-select
                            :options="ingredients"
                            style="width:80%"
                        ></b-form-select>
                        <b-button style="float:right">Add</b-button>
                    </div>
                    <br />
                    <b-table
                        striped
                        hover
                        :items="menuItemIngredients.ingredients"
                        :fields="iFields"
                    >
                        <template v-slot:cell(Delete)="item">
                            <div>
                                <span
                                    class="actionIcon deleteIcon"
                                    @click="deleteItem(item.item)"
                                >
                                    <font-awesome-icon
                                        icon="minus-circle"
                                        size="lg"
                                    />
                                    <span>Delete</span>
                                </span>
                            </div>
                        </template>
                    </b-table>
                </b-form>
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
            selectedMenuItem: 1,
            menuItemIngredients: [],
            name: 'Menu Item',
            fields: [
                'Edit',
                {
                    key: 'name',
                    label: 'Menu Item Name'
                },
                'Delete'
            ],
            iFields: ['name', 'Delete']
        };
    },
    computed: {
        data: function() {
            return dataService.getMenuItems();
        },
        ingredients: function() {
            let ddlist = [];
            let ds_rtn = dataService.getIngredients();
            let ingredients = ds_rtn.ingredients;

            for (let i = 0; i < ingredients.length; i++) {
                let option = {
                    text: ingredients[i].name,
                    value: ingredients[i].name
                };
                ddlist.push(option);
            }

            return ddlist;
        }
    },
    methods: {
        deleteItem(item) {
            console.log(item);
        },
        editItem(item) {
            console.log(item);
        },
        getMenuItemIngredients() {
            this.menuItemIngredients = dataService.getMenuItemIngredients(
                this.selectedMenuItem
            );
        }
    }
};
</script>
