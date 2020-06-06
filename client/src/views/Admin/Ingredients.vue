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
                            @click="showDeleteConfirmation(item.item)"
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
            <b-modal
                id="modalForm1"
                :title="formTitle"
                @ok="OkClicked()"
                @hidden="getIngredients()"
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
            <b-modal
                id="modal-delete"
                title="Delete Confirmation"
                okTitle="Yes"
                cancelTitle="No"
                @ok="doDelete()"
                @cancel="cancelDelete()"
            >
                <b-form>
                    Are you sure you want to delete this?
                </b-form>
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
            ingredients: [],
            selectedItem: {},
            selectedObjectToBeDeleted: null,
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
    computed: {
        rows() {
            let rtn = 0;
            if (this.ingredients !== null) {
                rtn = this.ingredients.length;
            }
            return rtn;
        }
    },
    mounted() {
        this.getIngredients();
    },
    methods: {
        getIngredients() {
            dataService.ingredients.getIngredients().then(result => {
                this.ingredients = result;
            });
        },
        showDeleteConfirmation(item) {
            this.selectedObjectToBeDeleted = item;
            this.$bvModal.show('modal-delete');
        },
        cancelDelete() {
            this.selectedObjectToBeDeleted = null;
        },
        doDelete() {
            dataService.ingredients
                .deleteIngredient(this.selectedObjectToBeDeleted)
                .then(() => {
                    this.getIngredients();
                });
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
        },
        OkClicked() {
            if (this.selectedItem.ingredient_id !== undefined) {
                if (this.IsValidObject(this.selectedItem)) {
                    dataService.ingredients
                        .updateIngredient(this.selectedItem)
                        .then(() => {
                            this.getIngredients();
                        });
                } else {
                    alert('Name required.');
                    this.getIngredients();
                }
            } else {
                let newObj = {
                    name: this.selectedItem.name
                };

                if (this.IsValidObject(newObj)) {
                    dataService.ingredients
                        .insertIngredient(newObj)
                        .then(() => {
                            this.getIngredients();
                        });
                } else {
                    alert('Name required.');
                    this.getIngredients();
                }
            }
        },
        IsValidObject(newObj) {
            //console.log(JSON.stringify(customerObject));
            let c = newObj;
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
