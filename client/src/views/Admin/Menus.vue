<template>
    <div>
        <h1>{{ name }}</h1>
        <div style="width:90%; margin-left:50px;margin-top:40px">
            <div>
                <span style="float:right;margin-right:40px;padding-bottom:10px">
                    <font-awesome-icon
                        icon="plus-circle"
                        size="lg"
                        style="color:green;cursor:pointer"
                        @click="showModalForm()"
                    />
                    <span> Add New</span>
                </span>
            </div>
            <b-table striped hover :items="menus" :fields="fields">
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
                @hidden="getMenus()"
            >
                <b-form>
                    <b-form-input
                        id="input-1"
                        type="text"
                        required
                        v-model="selectedItem.name"
                    ></b-form-input
                ></b-form>
            </b-modal>
        </div>
    </div>
</template>

<script>
import dataService from '../../dataServices';

export default {
    data() {
        //view model
        return {
            menus: [],
            selectedItem: {},
            formTitle: '',
            name: 'Menus',
            fields: ['Edit', { key: 'name', label: 'Menu Name' }, 'Delete']
        };
    },
    mounted() {
        this.getMenus();
    },
    methods: {
        getMenus() {
            dataService.menus.getMenus().then(result => {
                this.menus = result;
            });
        },
        deleteItem(item) {
            dataService.menus.deleteMenu(item).then(() => {
                this.getMenus();
            });
        },
        editItem(item) {
            this.selectedItem = item;
            this.formTitle = 'Edit Menu Name';
            this.$bvModal.show('modalForm1');
        },
        showModalForm() {
            this.selectedItem = {};
            this.formTitle = 'Add New Menu';
            this.$bvModal.show('modalForm1');
        },
        OkClicked() {
            console.log(this.selectedItem);
            if (this.selectedItem.menu_id !== undefined) {
                if (this.IsValidMenuObject(this.selectedItem)) {
                    dataService.menus.updateMenu(this.selectedItem);
                } else {
                    alert('Name required.');
                    this.getMenus();
                }
            } else {
                let newMenu = {
                    name: this.selectedItem.name
                };

                if (this.IsValidMenuObject(newMenu)) {
                    dataService.menus.insertMenu(newMenu).then(() => {
                        this.getMenus();
                    });
                } else {
                    alert('Name required.');
                    this.getMenus();
                }
            }
        },
        IsValidMenuObject(newMenu) {
            //console.log(JSON.stringify(customerObject));
            let c = newMenu;
            let IsValid = true;
            if (typeof c === 'undefined') {
                return false;
            }
            if (typeof c.name === 'undefined' || c.name === null) {
                return false;
            }
            if (c.name.length === 0) {
                return false;
            }
            return IsValid;
        }
    }
};
</script>
