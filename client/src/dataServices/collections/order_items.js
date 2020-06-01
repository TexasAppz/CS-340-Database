// Order Items Data Service Module
module.exports = function(api) {
    function getOrderItem(orderItemId) {
        return api
            .get('/order_items/' + orderItemId)
            .then(response => response.data);
    }

    function insertOrderItemItem(orderItem) {
        return api
            .post('/order_items', orderItem)
            .then(response => response.data);
    }

    function updateOrderItem(orderItem) {
        return api
            .patch('/order_items', orderItem)
            .then(response => response.data);
    }

    function deleteOrderItem(orderItem) {
        return api
            .delete('/order_items/' + orderItem.order_item_id)
            .then(response => response.data);
    }

    return {
        getOrderItem,
        insertOrderItemItem,
        updateOrderItem,
        deleteOrderItem
    };
};
