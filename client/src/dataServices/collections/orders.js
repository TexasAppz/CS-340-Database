// Orders Data Service Module
module.exports = function(api) {
    function getOrder(id) {
        if (typeof id !== 'undefined') {
            return api.get('/orders/' + id).then(response => response.data);
        }
    }

    function getOpenOrders() {
        return api
            .get('/orders/status/nopickup')
            .then(response => response.data);
    }

    function createNewOrderForCustomer(customer) {
        return api.post('/orders', customer).then(response => response.data);
    }

    function updateOrderSummary(order) {
        return api.patch('/orders', order).then(response => response.data);
    }

    function saveFullOrder(order) {
        return api.put('/orders', order).then(response => response.data);
    }

    function deleteOrder(order) {
        return api.delete('/orders', order).then(response => response.data);
    }

    return {
        getOrder,
        getOpenOrders,
        createNewOrderForCustomer,
        updateOrderSummary,
        saveFullOrder,
        deleteOrder
    };
};
