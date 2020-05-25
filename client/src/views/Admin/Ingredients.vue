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
                        @click="showModalForm()"
                    />
                    <span> Add New</span>
                </span>
            </div>
            <div>
                Sorting By: <b>{{ sortBy }}</b
                >, Sort Direction:
                <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
            </div>
            <b-table
                striped
                hover
                :items="ingredients"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                responsive="sm"
                sort-icon-left
                id="my-table"
            >
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
            <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                aria-controls="my-table"
                style="float:right"
            ></b-pagination>
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
// import store from '@/store/index';
// import router from '@/router/index';
import dataService from '../../dataServices';

export default {
    data() {
        //view model
        return {
            selectedItem: {},
            formTitle: '',
            name: 'Ingredients',
            fields: [
                'Edit',
                { key: 'name', label: 'Ingredient Name', sortable: true },
                'Delete'
            ],
            perPage: 10,
            currentPage: 1,
            sortBy: 'name',
            sortDesc: false
        };
    },
    asyncComputed: {
        ingredients: function() {
            return dataService.ingredients.getIngredients();
        }
    },
    computed: {
        rows() {
            let rtn = 0;
            if (this.ingredients !== null) {
                rtn = this.ingredients.length;
            }
            return rtn;
        }
    },
    methods: {
        deleteItem(item) {
            alert(item.name + ' would be deleted');
        },
        editItem(item) {
            this.selectedItem = item;
            this.formTitle = 'Edit Ingredient Name';
            this.$bvModal.show('modalForm1');
        },
        showModalForm() {
            this.selectedItem = {};
            this.formTitle = 'Add New Ingredient';
            this.$bvModal.show('modalForm1');
        }
    }
};
</script>
