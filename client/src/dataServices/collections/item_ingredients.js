// Item Ingredients Data Service Module
module.exports = function(api) {
    function insertItemIngredient(itemIngredient) {
        return api
            .post('/item_ingredients', itemIngredient)
            .then(response => response.data);
    }

    function deleteItemIngredient(itemIngredient) {
        return api
            .delete('/item_ingredients/' + itemIngredient.item_ingredient_id)
            .then(response => response.data);
    }

    return {
        insertItemIngredient,
        deleteItemIngredient
    };
};
