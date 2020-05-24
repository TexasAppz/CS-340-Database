/*eslint no-unused-vars: "off"*/

const axios = require('axios').default;
const api = axios.create({ baseURL: 'http://localhost:5150' });

function login(username) {
    if (typeof username !== 'undefined') {
        return api
            .get('/customers/byEmail/' + username)
            .then(response => response.data);
    }
}

function getOpenOrders() {
    return api.get('/orders/nopickup').then(response => response.data);
}

function getMenus() {
    return api.get('/menus').then(response => response.data);
}

function getMenu(menuId) {
    if (typeof menuId !== 'undefined') {
        return api.get('/menus/' + menuId).then(response => response.data);
    }
}

function getMenuItems() {
    return api.get('/menu_items').then(response => response.data);
}

function getIngredients() {
    return api.get('/ingredients').then(response => response.data);
}

function getMenuItemIngredients(menu_item_id) {
    menu_item_id;
    return {
        ingredients: [
            { ingredient_id: 1, name: 'Buttermilk pancakes' },
            { ingredient_id: 2, name: 'Bacon' },
            { ingredient_id: 3, name: 'Eggs' }
        ]
    };
}

function getAccounts() {
    return api.get('/customers').then(response => response.data);
}

function getOrder(id) {
    if (typeof id !== 'undefined') {
        return api.get('/orders/' + id).then(response => response.data);
    }
    /*
    return {
        order_id: id,
        customer: {
            customer_id: 1,
            name: 'Bob Smith',
            email: 'bsmith@cs340.com'
        },
        order_items: [
            { menuitem_id: 1, name: 'Pancakes', price: '10.95', qty: 1 },
            { menuitem_id: 2, name: 'Eggs Benedict', price: '12.95', qty: 1 },
            { menuitem_id: 3, name: 'Waffles', price: '9.95', qty: 2 }
        ],
        sub_total: '43.80',
        tax: '3.28',
        total: '47.08',
        status: 'Ready For Pickup'
    };
    */
}

module.exports = {
    getMenu,
    login,
    getOpenOrders,
    getMenus,
    getMenuItems,
    getIngredients,
    getMenuItemIngredients,
    getAccounts,
    getOrder
};
