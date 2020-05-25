/*eslint no-unused-vars: "off"*/

const axios = require('axios').default;
const api = axios.create({ baseURL: 'http://localhost:5150' });

const customers = require('./collections/customers')(api);
const orders = require('./collections/orders')(api);
const menus = require('./collections/menus')(api);
const menuItems = require('./collections/menu_items')(api);
const ingredients = require('./collections/ingredients')(api);

module.exports = {
    customers,
    orders,
    menus,
    ingredients,
    menuItems
};
