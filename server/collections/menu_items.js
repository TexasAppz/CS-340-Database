// menu_items.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// -- Main Page: 
// Return the menu name and item information for all menu items in the database
// GET /menu_items/menu_items
// Returns menu Item Name
router.get("/itemName", function (req, res, next) {
    let sqlQuery =   
    `SELECT  me.name menuName, mi.name menuItemName
        FROM Menus me
        JOIN Menu_Items mi
        ON(me.menu_id = mi.menu_id)`;
    let getData = [req.params.menuName];
    mysql.pool.query(sqlQuery, getData, function (err, result) {
        if (err) {
            next(err);
            return;
        }
        // If no records returned, send back something indicating that
        if (result.length > 0) {
            res.end(JSON.stringify(result));
        } else {
            res.end(
                JSON.stringify({
                    status_code: "100",
                    message: "No Records Found",
                })
            );
        }
    });
});

// // GET /menu_items/:id
// Select a specific menu item given a menu item id
router.get("/:id", function (req, res, next) {
    let sqlQuery =
        `SELECT  mi.menu_item_id,
        me.name menuName, mi.name menuItemName
        FROM Menus me
        JOIN Menu_Items mi
        ON(me.menu_id = mi.menu_id)
        WHERE mi.menu_item_id = ?`;
    let getData = [req.params.id];
    mysql.pool.query(sqlQuery, getData, function (err, result) {
        if (err) {
            next(err);
            return;
        }
        // If no records returned, send back something indicating that
        if (result.length > 0) {
            res.end(JSON.stringify(result));
        } else {
            res.end(
                JSON.stringify({
                    status_code: "100",
                    message: "No Records Found",
                })
            );
        }
    });
});


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

// GET /menu_items/phrase
// get all menu items information, including ingredients, using a search phrase
router.get("/phrase/", function (req, res, next) {
    let sqlQuery = 
    `SELECT *
        from Menus m
        JOIN Menu_Items mi 
            ON (m.menu_id = mi.menu_id)
        JOIN Item_Ingredients ii 
            ON (mi.menu_item_id = ii.menu_item_id)
        JOIN Ingredients i 
            ON (ii.ingredient_id = i.ingredient_id)
        WHERE 
            m.name like '%:Tacos%' 
                OR 
            mi.name like '%Waffles%'`;
    let getData = req.params.name;
    mysql.pool.query(sqlQuery, getData, function (err, result) {
        if (err) {
            next(err);
            return;
        }
        //If no records returned, send back something indicating that
        if (result.length > 0) {
            res.end(JSON.stringify(result));
        } else {
            res.end(
                JSON.stringify({
                    status_code: "100",
                    message: "No Records Found",
                })
            );
        }
    });
});

// POST /menu_items/
// Create a new menu item given a new name, price, 
// and a menu id to associate if applicable.
router.post("/", function (req, res, next) {
    let sqlQuery =
        `INSERT INTO Menu_Items 
        (menu_item_id, menu_id, name, price)
        VALUES (?,?,?,?)`;
    let sqlParams = [req.body.menu_item_id,req.body.menu_id, req.body.name, req.body.price];
    let isValid = true; //Could be used for a validation of the parameters

    let returnMsg = {};
    if (isValid) {
        mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
            if (err) {
                returnMsg.status_code = 999;
                returnMsg.message = err.sqlMessage;
                res.end(JSON.stringify(returnMsg));
            } else {
                returnMsg.menu_item_id = result.insertId;
                res.end(JSON.stringify(returnMsg));
            }
        });
    } else {
        returnMsg.status_code = 0;
        returnMsg.message = "Invalid data";
        res.end(JSON.stringify(returnMsg));
    }
});

module.exports = router;