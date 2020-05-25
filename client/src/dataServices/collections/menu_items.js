// Menu Items Data Service Module
module.exports = function(api) {
    function getMenuItems() {
        return api.get('/menu_items').then(response => response.data);
    }
    return {
        getMenuItems
    };
};
