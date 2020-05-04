<template>
    <div>
        <h1>Cart page</h1>
        <div style="width:800px; margin: 0 auto">
            <b-table striped hover :items="cart" :fields="fields">
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
                    <b-button variant="primary">Place Order</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store/index';

export default {
    name: 'Cart',
    data() {
        return {
            fields: [
                'name',
                {
                    key: 'price',
                    lable: 'Price',
                    formatter: (value, key, item) => {
                        return `$` + (item.price * 1).toFixed(2);
                    }
                },
                'qty',
                {
                    key: 'extPrice',
                    lable: 'Ext Price',
                    formatter: (value, key, item) => {
                        return `$` + (item.price * item.qty).toFixed(2);
                    }
                }
            ]
        };
    },
    components: {},
    computed: {
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
        }
    },
    mounted() {}
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
