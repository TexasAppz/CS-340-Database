// orders.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /orders
// Returns all values from the database for the table Orders
router.get("/", function (req, res, next) {
    let sqlQuery = "SELECT * FROM Orders order by order_id";
    mysql.pool.query(sqlQuery, function (err, result) {
        if (err) {
            next(err);
            return;
        }

        res.end(JSON.stringify(result));
    });
});
// GET /orders/new/
// Returns all new orders 
router.get("/new/", function (req, res, next) {
    let sqlQuery = "SELECT * FROM Orders WHERE status = 'New' ";
    let getData = req.params.status;
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
// GET /orders/noickup/
// Returns all  orders where they have not been picked up
router.get("/nopickup/", function (req, res, next) {
    let sqlQuery = "SELECT * FROM Orders WHERE status <> 'Picked up' ";
    let getData = req.params.status;
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

// GET /orders/noickup/
// Returns all  orders where they have not been picked up
router.get("/:orderId", function (req, res, next) {
    let sqlQuery = "SELECT * FROM Orders WHERE order_id = ? ";
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

//Inserts new order record given a customer_id
router.post("/", function (req, res, next) {
    let sqlQuery = "INSERT INTO Orders (customer_id) VALUES (?)";
    let sqlParams = [req.body.customer_id];
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