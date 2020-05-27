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

    function insertIngredient(ingredient) {
        return api
            .post('/ingredients', ingredient)
            .then(response => response.data);
    }

    function deleteIngredient(ingredient_id) {
        return api
            .delete('/ingredients/' + ingredient_id)
            .then(response => response.data);
    }

    function updateIngredient(ingredient) {
        return api
            .patch('/ingredients/' + ingredient.ingredient_id, ingredient)
            .then(response => response.data);
    }
    return {
        getIngredients,
        getMenuItemIngredients,
        insertIngredient,
        deleteIngredient,
        updateIngredient
    };
};
