<template>
    <b-card>
        <b-row no-gutters>
            <b-col md="3">
                <b-card-img
                    :src="imageUrl"
                    alt="Image"
                    class="rounded-0"
                    fluid
                ></b-card-img>
            </b-col>
            <b-col md="6">
                <b-card-body>
                    <h2>{{ menuItem.name }}</h2>
                    <b-card-text v-show="listWithCommas(menuItem.ingredients)">
                        This menu item includes
                        <span>
                            {{ listWithCommas(menuItem.ingredients) }}
                        </span>
                    </b-card-text>
                </b-card-body>
            </b-col>
            <b-col md="3">
                <h5>${{ menuItem.price }}</h5>
                <div>
                    <b-form-spinbutton
                        v-model="qty"
                        id="'sp_input"
                        value="1"
                        inline
                    ></b-form-spinbutton>
                </div>
                <div class="cartIcon">
                    <font-awesome-icon
                        icon="cart-plus"
                        size="2x"
                        v-on:click="addToCart()"
                    />
                </div>
            </b-col>
        </b-row>
    </b-card>
</template>

<script>
import store from '@/store/index';

export default {
    data() {
        return {
            qty: 1
        };
    },
    computed: {
        imageUrl() {
            let id = this.menuItem.menu_item_id;
            let imgUrl = 'https://i.picsum.photos/id/5' + id + '/200/200.jpg';
            if (this.menuItem.menu_item_id < 10) {
                imgUrl = '/images/Menu_Items/' + id + '.jpg';
                if (!window.location.href.includes('localhost')) {
                    imgUrl = '/~cazellap' + imgUrl;
                }
            }
            return imgUrl;
        }
    },
    props: {
        menuItem: {
            type: Object,
            required: true
        }
    },
    methods: {
        listWithCommas(list) {
            let rtn = '';
            if (list[0]) {
                rtn = list[0].name;
                if (list.length > 0) {
                    for (let i = 1; i < list.length; ++i) {
                        if (i + 1 == list.length) {
                            rtn += ' and ' + list[i].name;
                        } else {
                            rtn += ',' + list[i].name;
                        }
                    }
                }
            }
            return rtn;
        },
        addToCart() {
            store
                .dispatch('addToCart', {
                    menu_item_id: this.menuItem.menu_item_id,
                    name: this.menuItem.name,
                    price: this.menuItem.price,
                    qty: this.qty
                })
                .then(() => {
                    this.qty = 1;
                });
        }
    }
};
</script>
