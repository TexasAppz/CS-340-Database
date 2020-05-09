/*eslint no-unused-vars: "off"*/

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

function login(userCredentials) {
    userCredentials;
    return {
        customer_id: 1,
        name: 'Bob Smith',
        email: 'bsmith@noneyabiznes.com'
    };
}

function getOpenOrders() {
    return {
        orders: [
            {
                order_id: 1,
                customerName: 'Bob',
                orderStatus: 'Ready'
            },
            {
                order_id: 2,
                customerName: 'John',
                orderStatus: 'Ready'
            },
            {
                order_id: 3,
                customerName: 'May',
                orderStatus: 'New'
            },
            {
                order_id: 4,
                customerName: 'Kathy',
                orderStatus: 'New'
            },
            {
                order_id: 5,
                customerName: 'Brent',
                orderStatus: 'New'
            }
        ]
    };
}

function getMenus() {
    return {
        menus: [
            {
                menu_id: 1,
                name: 'Breakfast'
            },
            {
                menu_id: 2,
                name: 'Lunch'
            },
            {
                menu_id: 3,
                name: 'Dinner'
            }
        ]
    };
}

module.exports = {
    getMenu,
    login,
    getOpenOrders,
    getMenus
};
