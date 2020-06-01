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
        let dbOrder = {
            order_id: order.order_id,
            customer_id: order.customer_id,
            status: order.status,
            subtotal: order.cartSummary.subTotal,
            tax: order.cartSummary.tax,
            total: order.cartSummary.grandTotal
        };
        console.log(dbOrder);
        return api.patch('/orders', dbOrder).then(response => response.data);
    }

    function deleteOrder(order) {
        return api
            .delete('/orders/' + order.order_id)
            .then(response => response.data);
    }

    return {
        getOrder,
        getOpenOrders,
        createNewOrderForCustomer,
        updateOrderSummary,
        deleteOrder
    };
};
