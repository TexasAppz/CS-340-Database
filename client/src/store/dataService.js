/*eslint no-unused-vars: "off"*/

const axios = require('axios').default;
const api = axios.create({ baseURL: 'http://localhost:5150' });

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
    return api.get('/menus').then(response => response.data);
}

function getMenuItems() {
    return {
        menuItems: [
            {
                name: 'Pankakes',
                price: 10.95,
                menu_id: 1,
                menu_name: 'Breakfast',
                menu_item_id: 1
            },
            {
                name: 'Eggs Benedict',
                price: 12.95,
                menu_id: 1,
                menu_name: 'Breakfast',
                menu_item_id: 2
            },
            {
                name: 'Waffles',
                price: 9.95,
                menu_id: 1,
                menu_name: 'Breakfast',
                menu_item_id: 3
            },
            {
                name: 'Grilled Chicken Sandwich',
                price: 12.95,
                menu_id: 2,
                menu_name: 'Lunch',
                menu_item_id: 4
            },
            {
                name: 'Bacon Cheeseburger',
                price: 14.95,
                menu_id: 2,
                menu_name: 'Lunch',
                menu_item_id: 5
            },
            {
                name: 'Peanut Butter and Jelly Sandwich',
                price: 5.95,
                menu_id: 2,
                menu_name: 'Lunch',
                menu_item_id: 6
            },
            {
                name: 'Steak and Lobster',
                price: 24.95,
                menu_id: 3,
                menu_name: 'Dinner',
                menu_item_id: 7
            },
            {
                name: 'Spaghetti with Meatballs',
                price: 14.95,
                menu_id: 3,
                menu_name: 'Dinner',
                menu_item_id: 8
            },
            {
                name: 'Taco Salad',
                price: 10.95,
                menu_id: 3,
                menu_name: 'Dinner',
                menu_item_id: 9
            }
        ]
    };
}

function getIngredients() {
    return {
        ingredients: [
            { ingredient_id: 1, name: 'Buttermilk pancakes' },
            { ingredient_id: 2, name: 'Bacon' },
            { ingredient_id: 3, name: 'Eggs' },
            { ingredient_id: 4, name: 'Ham' },
            { ingredient_id: 5, name: 'Hollandaise Sauce' },
            { ingredient_id: 6, name: 'English Muffin' },
            { ingredient_id: 7, name: 'Golden Waffles' },
            { ingredient_id: 8, name: 'Kaiser Roll' },
            { ingredient_id: 9, name: 'Grilled Chicken' },
            { ingredient_id: 10, name: 'Lettuce' },
            { ingredient_id: 11, name: 'Tomato' },
            { ingredient_id: 12, name: 'Onion' },
            { ingredient_id: 13, name: 'Peanut Butter' },
            { ingredient_id: 14, name: 'Grape Jelly' },
            { ingredient_id: 15, name: 'Quarter Pound Beef Patty' },
            { ingredient_id: 16, name: 'French Fries' },
            { ingredient_id: 17, name: 'Fruit Cup' },
            { ingredient_id: 18, name: 'Rib Eye Steak' },
            { ingredient_id: 19, name: 'Lobster Tail' },
            { ingredient_id: 20, name: 'Rice Pilaf' },
            { ingredient_id: 21, name: 'House Salad' },
            { ingredient_id: 22, name: 'Spaghetti' },
            { ingredient_id: 23, name: 'Italian Meatballs' },
            { ingredient_id: 24, name: 'Tomato Sauce' },
            { ingredient_id: 25, name: 'Taco seasoned beef' },
            { ingredient_id: 26, name: 'Salsa' },
            { ingredient_id: 27, name: 'Shredded Cheese' },
            { ingredient_id: 28, name: 'Sour Cream' },
            { ingredient_id: 29, name: 'Guacamole' },
            { ingredient_id: 30, name: 'Cheddar Cheese' }
        ]
    };
}

function getMenuItemIngredients(menu_item_id) {
    menu_item_id;
    return {
        ingredients: [
            { ingredient_id: 1, name: 'Buttermilk pancakes' },
            { ingredient_id: 2, name: 'Bacon' },
            { ingredient_id: 3, name: 'Eggs' }
        ]
    };
}

function getAccounts() {
    return {
        accounts: [
            {
                account_id: 1,
                name: 'Bob Smith',
                email: 'bsmith@cs340.com'
            },
            {
                account_id: 2,
                name: 'Kathy Jones',
                email: 'kjones@cs340.com'
            },
            {
                account_id: 3,
                name: 'Roger Allens',
                email: 'rallens@cs340.com'
            }
        ]
    };
}

function getOrder(id) {
    return {
        order_id: id,
        customer: {
            customer_id: 1,
            name: 'Bob Smith',
            email: 'bsmith@cs340.com'
        },
        order_items: [
            { menuitem_id: '1', name: 'Pancakes', price: '10.95', qty: 1 },
            { menuitem_id: '2', name: 'Eggs Benedict', price: '12.95', qty: 1 },
            { menuitem_id: '3', name: 'Waffles', price: '9.95', qty: 2 }
        ],
        sub_total: '43.80',
        tax: '3.28',
        total: '47.08',
        status: 'Ready For Pickup'
    };
}

module.exports = {
    getMenu,
    login,
    getOpenOrders,
    getMenus,
    getMenuItems,
    getIngredients,
    getMenuItemIngredients,
    getAccounts,
    getOrder
};
