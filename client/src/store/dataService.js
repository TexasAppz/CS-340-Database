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

function insertCustomer(customer) {
    return api.post('/customers', customer).then(response => response.data);
}

function deleteCustomer(customer_id) {
    return api
        .delete('/customers/' + customer_id)
        .then(response => response.data);
}

function updateCustomer(customer) {
    return api
        .patch('/customers/' + customer.customer_id, customer)
        .then(response => response.data);
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
    if (typeof menu_item_id !== 'undefined') {
        return api
            .get('/ingredients/menu_item/' + menu_item_id)
            .then(response => response.data);
    }
}

function getAccounts() {
    return api.get('/customers').then(response => response.data);
}

function getOrder(id) {
    if (typeof id !== 'undefined') {
        return api.get('/orders/' + id).then(response => response.data);
    }
}

module.exports = {
    getMenu,
    login,
    insertCustomer,
    deleteCustomer,
    updateCustomer,
    getOpenOrders,
    getMenus,
    getMenuItems,
    getIngredients,
    getMenuItemIngredients,
    getAccounts,
    getOrder
};
