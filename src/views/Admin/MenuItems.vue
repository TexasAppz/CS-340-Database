<template>
    <div>
        <h1>{{ name }}</h1>
        <div style="width:90%; margin-left:50px;margin-top:40px">
            <div>
                <span style="float:right;margin-right:40px;padding-bottom:10px">
                    <font-awesome-icon
                        icon="plus-circle"
                        size="lg"
                        style="color:green"
                        @click="showModalForm()"
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
            <b-modal id="modalForm1" title="Add New Menu Item">
                <b-form>
                    <b-form-input
                        id="input-name"
                        type="text"
                        placeholder="Name"
                        style="margin:8px;"
                        :value="selectedMenuItem.name"
                        required
                    >
                    </b-form-input>
                    <b-form-input
                        id="input-price"
                        type="number"
                        style="margin:8px;"
                        placeholder="1.00"
                        step="0.01"
                        min="0"
                        max="50"
                        :value="selectedMenuItem.price"
                        required
                    >
                    </b-form-input>
                    <fieldset style="margin-left:20px;">
                        <legend>On Menu</legend>
                        <input type="radio" value="1" />
                        <label for="one">Breakfast</label>
                        <br />
                        <input type="radio" value="2" />
                        <label for="two">Lunch</label>
                        <br />
                        <input type="radio" value="3" />
                        <label for="two">Dinner</label>
                        <br />
                        <input type="radio" value="" />
                        <label for="two">None</label>
                    </fieldset>
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
            selectedMenuItem: {},
            name: 'Menu Item',
            fields: [
                'Edit',
                {
                    key: 'menu_name',
                    label: 'Menu Name'
                },
                {
                    key: 'name',
                    label: 'Item Name'
                },
                {
                    key: 'price',
                    label: 'Price',
                    formatter: (value, key, item) => {
                        return `$` + (item.price * 1).toFixed(2);
                    }
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
        meuns: function() {
            return dataService.getMenus();
        }
    },
    methods: {
        deleteItem(item) {
            //console.log(item);
            alert(item.name + ' would be deleted.');
        },
        editItem(item) {
            this.selectedMenuItem = item;
            this.$bvModal.show('modalForm1');
        },
        showModalForm() {
            this.selectedMenuItem = {};
            this.$bvModal.show('modalForm1');
        }
    }
};
</script>
