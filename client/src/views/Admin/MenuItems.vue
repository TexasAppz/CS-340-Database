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
            <b-modal id="modalForm1" :title="formTitle" @ok="OkClicked()">
                <b-form>
                    <b-form-input
                        id="input-name"
                        type="text"
                        placeholder="Name"
                        style="margin:8px;"
                        v-model="selectedItem.name"
                        required
                    >
                    </b-form-input>
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
                    <fieldset style="margin-left:20px;">
                        <legend>On Menu</legend>
                        <b-form-select
                            v-model="selectedItem.menu_id"
                            :options="menus"
                            style="margin-right:10px"
                        ></b-form-select>
                        <div
                            style="color:red;text-align:center"
                            v-if="selectedItem.menu_item_id"
                        >
                            <hr />
                            Still working on having and editable ingredients
                            list here<br /><br />
                            This will be one of our M:M
                        </div>
                    </fieldset>
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
            menuItems: [],
            selectedItem: {},
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
            dataService.menuItems.getMenuItems().then(data => {
                this.menuItems = data;
            });
        },
        deleteItem(item) {
            alert(item.name + ' would be deleted.');
        },
        editItem(item) {
            this.selectedItem = item;
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
                    alert('TODO: Update menu');
                } else {
                    alert('Invalid Vaid');
                    this.getMenus();
                }
            } else {
                //Add New Menu Item
                console.log(this.selectedItem);
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
