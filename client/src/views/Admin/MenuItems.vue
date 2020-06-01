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
            <b-table striped hover :items="menuItems" :fields="fields">
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
            <b-modal
                id="modalForm1"
                :title="formTitle"
                @ok="OkClicked()"
                @hidden="getMenuItems()"
            >
                <b-form>
                    <b-tabs>
                        <b-tab title="Menu Item Info" style="padding-top:20px;">
                            <label>Menu Item Name</label>
                            <b-form-input
                                id="input-name"
                                type="text"
                                placeholder="Name"
                                style="margin:8px;"
                                v-model="selectedItem.name"
                                required
                            >
                            </b-form-input>
                            <label>Price</label>
                            <b-form-input
                                id="input-price"
                                type="number"
                                style="margin:8px;"
                                placeholder="1.00"
                                step="0.01"
                                min="1"
                                max="25"
                                v-model="selectedItem.price"
                                required
                            >
                            </b-form-input>

                            <label>On Menu</label>
                            <b-form-select
                                v-model="selectedItem.menu_id"
                                :options="menus"
                                style="margin-right:10px"
                            ></b-form-select>
                            <div
                                style="color:red;text-align:center"
                                v-if="selectedItem.menu_item_id"
                            ></div>
                        </b-tab>
                        <b-tab title="Ingredients">
                            <div>
                                <table>
                                    <tr>
                                        <td width="100%">
                                            <b-form-select
                                                v-model="selectedIngredient"
                                                :options="ingredients"
                                                style="margin-right:10px"
                                            ></b-form-select>
                                        </td>
                                        <td>
                                            <b-button
                                                @click="
                                                    addIngredient(
                                                        selectedIngredient
                                                    )
                                                "
                                                >Add</b-button
                                            >
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <b-table
                                striped
                                hover
                                :items="menuItemIngredients"
                                :fields="miFields"
                            >
                                <template v-slot:cell(Delete)="item">
                                    <div>
                                        <span
                                            class="actionIcon deleteIcon"
                                            @click="
                                                deleteItemIngredient(item.item)
                                            "
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
                        </b-tab>
                    </b-tabs>
                </b-form>
            </b-modal>
        </div>
    </div>
</template>

<script>
//import store from '@/store/index';
// import router from '@/router/index';
import dataService from '../../dataServices';

export default {
    data() {
        //view model
        return {
            menus: [],
            ingredients: [],
            selectedIngredient: null,
            menuItems: [],
            selectedItem: {},
            menuItemIngredients: [],
            miFields: [
                {
                    key: 'name',
                    label: 'Ingredient Name'
                },
                'Delete'
            ],
            formTitle: '',
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
    mounted() {
        this.getMenus();
        this.getMenuItems();
        this.getIngredients();
    },
    methods: {
        getMenus() {
            dataService.menus.getMenus().then(data => {
                let rtn = [];
                rtn.push({ text: 'None', value: null });
                for (let i = 0; i < data.length; i++) {
                    rtn.push({
                        text: data[i].name,
                        value: data[i].menu_id
                    });
                }
                this.menus = rtn;
            });
        },
        getMenuItems() {
            dataService.menuItems
                .getMenuItems(this.selectedItem.menu_item_id)
                .then(data => {
                    this.menuItems = data;
                });
        },
        getMenuItemIngredients(item) {
            dataService.menuItems.getMenuItemIngredients(item).then(data => {
                this.menuItemIngredients = data;
            });
        },
        getIngredients() {
            dataService.ingredients.getIngredients().then(data => {
                this.ingredients = [];
                for (let i = 0; i < data.length; i++) {
                    this.ingredients.push({
                        text: data[i].name,
                        value: data[i].ingredient_id
                    });
                }
            });
        },
        addIngredient(item) {
            let obj = {
                menu_item_id: this.selectedItem.menu_item_id,
                ingredient_id: item
            };
            dataService.item_ingredients.insertItemIngredient(obj).then(() => {
                this.getMenuItemIngredients(this.selectedItem);
            });
            this.$bvModal.show('modalForm1');
        },
        deleteItem(item) {
            alert(item.name + ' would be deleted.');
        },
        deleteItemIngredient(item) {
            dataService.item_ingredients.deleteItemIngredient(item).then(() => {
                this.getMenuItemIngredients(item);
                this.editItem(item);
            });
        },
        editItem(item) {
            this.selectedItem = item;
            this.getMenuItemIngredients(item);
            this.formTitle = 'Edit Menu Item';
            this.$bvModal.show('modalForm1');
        },
        showModalForm() {
            this.selectedItem = { menu_id: null };
            this.formTitle = 'Add New Menu Item';
            this.$bvModal.show('modalForm1');
        },
        OkClicked() {
            if (this.selectedItem.menu_item_id !== undefined) {
                //Edit Menu Item
                if (this.IsValidObject(this.selectedItem)) {
                    let i = this.selectedItem;
                    let mi = {
                        menu_item_id: i.menu_item_id,
                        menu_id: i.menu_id,
                        name: i.name,
                        price: i.price
                    };
                    dataService.menuItems.updateMenuItem(mi);
                } else {
                    alert('Invalid Form');
                    this.getMenus();
                }
            } else {
                //Add New Menu Item
                if (this.IsValidObject(this.selectedItem)) {
                    dataService.menuItems
                        .insertMenuItem(this.selectedItem)
                        .then(() => {
                            this.getMenuItems();
                        });
                } else {
                    alert('Invalid Form');
                    this.getMenuItems();
                }
            }
        },
        IsValidObject(obj) {
            if (obj) {
                return true;
            }
        }
    }
};

/*
req.body.menu_item_id,
req.body.menu_id,
req.body.name,
req.body.price,
*/
</script>
