/*eslint no-unused-vars: "off"*/

const appConfig = require('../../appConfig.json');
let apiUrl = appConfig['apiPath-dev'];
if (appConfig.InProd) {
    apiUrl = appConfig['apiPath-prod'];
}
apiUrl += ':' + appConfig.apiPort.toString();

const axios = require('axios').default;
const api = axios.create({ baseURL: apiUrl });

const customers = require('./collections/customers')(api);
const orders = require('./collections/orders')(api);
const orderItems = require('./collections/order_items')(api);
const menus = require('./collections/menus')(api);
const menuItems = require('./collections/menu_items')(api);
const ingredients = require('./collections/ingredients')(api);
const item_ingredients = require('./collections/item_ingredients')(api);

function placeNewOrder(thisOrder) {
    return orders
        .createNewOrderForCustomer(thisOrder.customer)
        .then(function() {
            for (let i = 0; i < thisOrder.cart; ++i) {
                orderItems.insertOrderItemItem(thisOrder.cart[i]);
            }
        })
        .then(function() {
            orders.updateOrderSummary(thisOrder);
        });
}

function updateOrder(thisOrder) {
    return orders
        .getOrder(thisOrder.order_id)
        .then(function(savedOrder) {
            // remove existing orderitems
            if (savedOrder.order_items) {
                for (let i = 0; i < savedOrder.order_items.length; ++i) {
                    console.log(
                        orderItems.deleteOrderItem(savedOrder.order_items[i])
                    );
                }
            }
        })
        .then(function() {
            // insert thisOrder orderitems
            for (let i = 0; i < thisOrder.cart.length; ++i) {
                // Make sure each line item has the order_id included
                thisOrder.cart[i].order_id = thisOrder.order_id;
                orderItems.insertOrderItemItem(thisOrder.cart[i]);
            }
        })
        .then(function() {
            // update order summary
            orders.updateOrderSummary(thisOrder);
        });
}

module.exports = {
    customers,
    orders,
    menus,
    ingredients,
    menuItems,
    item_ingredients,
    placeNewOrder,
    updateOrder
};
