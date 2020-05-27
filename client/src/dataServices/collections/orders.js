// Orders Data Service Module
module.exports = function(api) {
    function getOrder(id) {
        if (typeof id !== 'undefined') {
            return api.get('/orders/' + id).then(response => response.data);
        }
    }

    function getOpenOrders() {
        return api.get('/orders/nopickup').then(response => response.data);
    }

    function insertOrder(customer) {
        return api.post('/orders', customer).then(response => response.data);
    }
    return {
        getOrder,
        getOpenOrders,
        insertOrder
    };
};
