function getMenu(menuId) {
    menuId;
    return {
        menu_id: '1',
        name: 'Breakfast',
        items: [
            {
                menuitem_id: '1',
                name: 'Pancakes',
                price: '10.95',
                ingredients: [
                    {
                        ingredient_id: '1',
                        name: 'Buttermilk pancakes'
                    },
                    {
                        ingredient_id: '2',
                        name: 'Bacon'
                    }
                ]
            },
            {
                menuitem_id: '2',
                name: 'Eggs Benedict',
                price: '12.95',
                ingredients: [
                    {
                        ingredient_id: '2',
                        name: 'Bacon'
                    },
                    {
                        ingredient_id: '3',
                        name: 'Eggs'
                    },
                    {
                        ingredient_id: '5',
                        name: 'Hollandaise Sauce'
                    },
                    {
                        ingredient_id: '6',
                        name: 'English Muffin'
                    }
                ]
            },
            {
                menuitem_id: '3',
                name: 'Waffles',
                price: '9.95',
                ingredients: [
                    {
                        ingredient_id: '7',
                        name: 'Golden Waffles'
                    },
                    {
                        ingredient_id: '2',
                        name: 'Bacon'
                    }
                ]
            }
        ]
    };
}

module.exports = {
    getMenu: getMenu
};
