<template>
    <div>
        <div style="text-align:center;padding:20px">
            <h2>Order Number {{ order.order_id }} for {{ customer.name }}</h2>
        </div>

        <div style="width:800px; margin: 0 auto">
            <div>
                <span>
                    <span>
                        Order Status:
                    </span>
                    <b-form-select
                        v-model="order.order_status"
                        :options="orderStatuses"
                        style="width:200px;margin-right:10px;margin-bottom:10px"
                    ></b-form-select>
                </span>
            </div>
            <b-table striped hover :items="cart" :fields="fields">
                <template v-slot:cell(remove)="item">
                    <div>
                        <span
                            class="actionIcon deleteIcon"
                            @click="deleteItem(item.item)"
                        >
                            <font-awesome-icon icon="minus-circle" size="lg" />
                        </span>
                    </div>
                </template>
                <template v-slot:cell(qty)="item">
                    <b-form-spinbutton
                        v-model="item.item.qty"
                        id="'sp_input"
                        inline
                        @change="updateItem(item.item)"
                    ></b-form-spinbutton>
                </template>
            </b-table>
            <hr />
            <div>
                <div style="float:left">
                    <table>
                        <tr>
                            <td>
                                Add Menu Item:
                            </td>
                            <td>
                                <b-form-select
                                    v-model="menuItemSelected"
                                    :options="menuItems"
                                    style="margin-right:10px"
                                ></b-form-select>
                            </td>
                            <td><b-button variant="primary">Add</b-button></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div style="text-align:right" id="cartSummarySection">
                <div>
                    <span>Sub Total</span>
                    <span class="cartSummaryItem"
                        >${{ cartSummary.subTotal.toFixed(2) }}</span
                    >
                </div>
                <div>
                    <span>Tax</span>
                    <span class="cartSummaryItem"
                        >${{ cartSummary.tax.toFixed(2) }}</span
                    >
                </div>
                <div>
                    <span>Grand Total</span>
                    <span class="cartSummaryItem"
                        >${{ cartSummary.grandTotal.toFixed(2) }}</span
                    >
                </div>
                <div class="cartSummaryItem" style="margin-top:20px">
                    <b-button variant="primary">Save Order</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store/index';
import dataService from '../../store/dataService';

export default {
    data() {
        return {
            menuItemSelected: null,
            menuItems: [],
            orderStatuses: [
                { text: 'New' },
                { text: 'In Process' },
                { text: 'Ready for Pickup' },
                { text: 'Picked Up' }
            ],
            order: {
                order_id: null,
                customer_id: null,
                customer_name: null,
                order_status: null,
                cart: null
            },
            fields: [
                'remove',
                'name',
                {
                    key: 'price',
                    label: 'Price',
                    formatter: (value, key, item) => {
                        return `$` + (item.price * 1).toFixed(2);
                    }
                },
                'qty',
                {
                    key: 'extPrice',
                    label: 'Ext Price',
                    formatter: (value, key, item) => {
                        return `$` + (item.price * item.qty).toFixed(2);
                    }
                }
            ]
        };
    },
    computed: {
        customer: function() {
            return store.getters.customer;
        },
        cart: function() {
            return store.getters.currentCart;
        },
        cartSummary: function() {
            return store.getters.currentCartSummary;
        }
    },
    methods: {
        updateItem(item) {
            store.dispatch('updateCartItem', item);
        },
        addToCart() {
            store
                .dispatch('addToCart', {
                    menuitem_id: this.menuItem.menuitem_id,
                    name: this.menuItem.name,
                    price: this.menuItem.price,
                    qty: this.qty
                })
                .then(() => {
                    this.qty = 1;
                });
        },
        deleteItem(item) {
            store.dispatch('removeFromCart', item);
        }
    },
    mounted() {
        let menuItems = dataService.getMenuItems().menuItems;
        for (let i = 0; i < menuItems.length; i++) {
            this.menuItems.push({
                text: menuItems[i].name + ' (' + menuItems[i].price + ')',
                value: menuItems[i].menu_item_id
            });
        }
        this.order.order_id = this.$route.params.id;
        store.dispatch('setOrder', this.$route.params.id);
    }
};
</script>
