// order_items.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /order_items
// Returns all order items
router.get("/", function (req, res, next) {
    let sqlQuery = "SELECT * FROM Order_Items";
    let getData = req.params.emailAddress;
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

// GET /order_items/:orderId
// Returns order items for a given order
router.get("/:orderId", function (req, res, next) {
    let sqlQuery = `SELECT oi.order_item_id, mi.name as MenuItemName, oi.price, oi.qty
                    FROM Order_Items oi 
                    JOIN Menu_Items mi 
                    ON (oi.menu_item_id = mi.menu_item_id)
                    JOIN Orders o
                    ON (o.order_id = oi.order_id)
                    WHERE o.order_id = ?`;
    let getData = req.params.orderId;
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

// POST /order_item/:order_item_id
// insert a line item to an order
router.post("/", function (req, res, next) {
    let sqlQuery = 
        `INSERT INTO Order_Items 
        (order_id, order_item_id)
        VALUES (?,?)`;
    let sqlParams = [req.body.order_id, req.body.order_item_id];
    let isValid = true; //Could be used for a validation of the parameters

    let returnMsg = {};
    if (isValid) {
        mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
            if (err) {
                returnMsg.status_code = 999;
                returnMsg.message = err.sqlMessage;
                res.end(JSON.stringify(returnMsg));
            } else {
                returnMsg.order_id = result.insertId;
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