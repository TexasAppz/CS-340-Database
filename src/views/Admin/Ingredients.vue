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
            <div>
                Sorting By: <b>{{ sortBy }}</b
                >, Sort Direction:
                <b>{{ sortDesc ? 'Descending' : 'Ascending' }}</b>
            </div>
            <b-table
                striped
                hover
                :items="data.ingredients"
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
            <b-button v-b-modal.modal-1>View Edit Form</b-button>
            <b-modal id="modal-1" title="Edit Ingredient">
                <b-form>
                    <b-form-input
                        id="input-1"
                        type="text"
                        required
                        placeholder="Buttermilk pancakes"
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
    computed: {
        data: function() {
            return dataService.getIngredients();
        },
        rows() {
            return this.data.ingredients.length;
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
