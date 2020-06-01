// order_items.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// Returns order items for a given order
router.get("/:orderId", function (req, res, next) {
  let sqlQuery = `
    SELECT 
      oi.*, mi.name as MenuItemName
    FROM 
      Order_Items oi 
      JOIN Menu_Items mi ON (oi.menu_item_id = mi.menu_item_id)
      JOIN Orders o ON (o.order_id = oi.order_id)
    WHERE o.order_id = ?`;
  let getData = req.params.orderId;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    //If no records returned, send back something indicating that
    if (result.length > 0) {
      res.json(result);
    } else {
      res.json({
        status_code: "100",
        message: "No Records Found",
      });
    }
  });
});

// insert a line item to an order
router.post("/", function (req, res) {
  let sqlQuery = `
    INSERT INTO Order_Items 
    (order_id, menu_item_id, price, qty, comment)
    VALUES (?,?,?,?,?)`;
  let sqlParams = [
    req.body.order_id,
    req.body.menu_item_id,
    req.body.price,
    req.body.qty,
    req.body.comment || null,
  ];
  let isValid = true; //Could be used for a validation of the parameters

  let returnMsg = {};
  if (isValid) {
    mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
      if (err) {
        returnMsg.status_code = 999;
        returnMsg.message = err.sqlMessage;
        res.json(returnMsg);
      } else {
        returnMsg.order_item_id = result.insertId;
        res.json(returnMsg);
      }
    });
  } else {
    returnMsg.status_code = 0;
    returnMsg.message = "Invalid data";
    res.json(returnMsg);
  }
});

// Update the provided values for a specific row in the Order_Items table
router.patch("/", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Order_Items SET ? WHERE order_item_id = " + req.body.order_item_id,
    req.body,
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.json(result);
    }
  );
});

// Deletes a row from the database for the table Order_Items
router.delete("/:id", function (req, res, next) {
  let sqlQuery = "DELETE FROM Order_Items WHERE order_item_id = ?";
  let getData = req.params.id;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;
