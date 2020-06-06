// Menu Items Data Service Module
module.exports = function(api) {
    function getMenuItems() {
        return api.get('/menu_items').then(response => response.data);
    }

    function getMenuItemIngredients(menuItem) {
        return api
            .get('/menu_items/' + menuItem.menu_item_id + '/ingredients')
            .then(response => response.data);
    }

    function insertMenuItem(menuItem) {
        return api
            .post('/menu_items', menuItem)
            .then(response => response.data);
    }

    function updateMenuItem(menuItem) {
        return api
            .patch('/menu_items', menuItem)
            .then(response => response.data);
    }

    function deleteMenuItem(menuItem) {
        return api
            .delete('/menu_items/' + menuItem.menu_item_id)
            .then(response => response.data);
    }

    return {
        getMenuItems,
        getMenuItemIngredients,
        insertMenuItem,
        updateMenuItem,
        deleteMenuItem
    };
};
