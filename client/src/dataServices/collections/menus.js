// Menus Data Service Module
module.exports = function(api) {
    function getMenus() {
        return api.get('/menus').then(response => response.data);
    }

    function getNavMenus() {
        return api.get('/menus/nav').then(response => response.data);
    }

    function getMenu(menuId) {
        if (typeof menuId !== 'undefined') {
            return api.get('/menus/' + menuId).then(response => response.data);
        }
    }

    function insertMenu(menu) {
        return api.post('/menus', menu).then(response => response.data);
    }

    function deleteMenu(menu_id) {
        return api.delete('/menus/' + menu_id).then(response => response.data);
    }

    return {
        getMenus,
        getNavMenus,
        getMenu,
        insertMenu,
        deleteMenu
    };
};
