// order_items.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /menu_items
// Returns all menu items
    router.get("/", function (req, res, next) {
        let sqlQuery = 
        `SELECT mi.menu_item_id, m.name as MenuName, mi.name MenuItemName, mi.price
            FROM Menus m
            JOIN Menu_Items mi 
            ON (m.menu_id = mi.menu_id)
            ORDER BY m.name, mi.name`;
        mysql.pool.query(sqlQuery, function (err, result) {
            if (err) {
                next(err);
                return;
            }

            res.end(JSON.stringify(result));
        });
    });


module.exports = router;