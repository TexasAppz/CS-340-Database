// Ingredients Data Service Module
module.exports = function(api) {
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
    return {
        getIngredients,
        getMenuItemIngredients
    };
};
