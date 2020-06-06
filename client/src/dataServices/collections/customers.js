// Customers Data Service Module
module.exports = function(api) {
    function login(username) {
        if (typeof username !== 'undefined') {
            return api
                .get('/customers/byEmail/' + username)
                .then(response => response.data);
        }
    }

    function getAccounts() {
        return api.get('/customers').then(response => response.data);
    }

    function insertCustomer(customer) {
        return api.post('/customers', customer).then(response => response.data);
    }

    function deleteCustomer(customer) {
        return api
            .delete('/customers/' + customer.customer_id)
            .then(response => response.data);
    }

    function updateCustomer(customer) {
        return api
            .patch('/customers/' + customer.customer_id, customer)
            .then(response => response.data);
    }

    return {
        login,
        getAccounts,
        insertCustomer,
        deleteCustomer,
        updateCustomer
    };
};
