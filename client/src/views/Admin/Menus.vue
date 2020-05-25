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
            <b-modal id="modalForm1" :title="formTitle">
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
            selectedItem: {},
            formTitle: '',
            name: 'Menus',
            fields: ['Edit', { key: 'name', label: 'Menu Name' }, 'Delete']
        };
    },
    asyncComputed: {
        menus() {
            return dataService.menus.getMenus();
        }
    },
    methods: {
        deleteItem(item) {
            alert(item.name + ' would be deleted');
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
        }
    }
};
</script>
