<template>
    <div>
        <div style="text-align:center;padding:20px">
            <h1>{{ name }}</h1>
        </div>

        <div style="width:800px; margin: 0 auto">
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
                    <b-button
                        variant="primary"
                        @click="placeOrder()"
                        v-show="HasItemsInCart"
                        >Place Order</b-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/*eslint no-unused-vars: "off"*/
import store from '@/store/index';
import router from '@/router/index';

export default {
    data() {
        return {
            name: 'My Cart',
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
        cart: function() {
            return store.getters.currentCart;
        },
        cartSummary: function() {
            return store.getters.currentCartSummary;
        },
        HasItemsInCart: function() {
            return this.cart.length !== 0;
        }
    },
    methods: {
        updateItem(item) {
            store.dispatch('updateCartItem', item);
        },
        deleteItem(item) {
            store.dispatch('removeFromCart', item);
        },
        placeOrder() {
            if (store.getters.customer === null) {
                alert('Please login, so we know placed this order.');
            } else {
                store.dispatch('placeOrder').then(newOrderId => {
                    alert(
                        'Order number ' +
                            newOrderId +
                            ' placed.\n You can pick it up in 15-20 mins!'
                    );
                    router.push({ name: 'Home' }).catch(err => {});
                });
            }
        }
    }
};
</script>

<style>
.cartSummaryItem {
    padding-left: 20px;
    padding-right: 0px;
    margin-top: 10px;
    margin-bottom: 10px;
}

#cartSummarySection > div {
    padding-top: 5px;
    margin-right: 20px;
}
</style>
