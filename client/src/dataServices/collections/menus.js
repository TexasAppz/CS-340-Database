// Menus Data Service Module
module.exports = function(api) {
    function getMenus() {
        return api.get('/menus').then(response => response.data);
    }

    function getMenu(menuId) {
        if (typeof menuId !== 'undefined') {
            return api.get('/menus/' + menuId).then(response => response.data);
        }
    }

    function insertMenu(customer) {
        return api.post('/menus', customer).then(response => response.data);
    }

    return {
        getMenus,
        getMenu,
        insertMenu
    };
};
