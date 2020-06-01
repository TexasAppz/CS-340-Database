// orders.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// Returns all active orders from the Orders table
router.get("/", function (req, res, next) {
  let sqlQuery = "SELECT * FROM Orders WHERE is_active = 1 ORDER BY order_id";
  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

// Returns all  orders where they have not been picked up
router.get("/status/nopickup/", function (req, res, next) {
  let sqlQuery = `
    SELECT 
      o.*,
      c.name customerName
    FROM Orders o
    join Customers c on o.customer_id = c.customer_id
    WHERE status <> 'Picked up' and o.is_active = 1`;
  let getData = req.params.status;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    //If no records returned, send back something indicating that
    if (result.length > 0) {
      res.json(result);
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

// Returns and entire order
router.get("/:orderId", function (req, res, next) {
  let thisOrder = {};

  mysql.pool.query(
    `SELECT * 
    FROM Orders
    WHERE order_id = ? `,
    req.params.orderId,
    function (err, result) {
      if (err) {
        next(err);
        return;
      }

      if (result.length > 0) {
        thisOrder = result[0];

        //--------------------------- Begin inner1 -----------
        mysql.pool.query(
          `SELECT *
          FROM Customers
          WHERE customer_id = ?`,
          thisOrder.customer_id,
          function (err, result) {
            if (err) {
              next(err);
              return;
            }
            if (result.length > 0) {
              thisOrder.customer = result;

              //--------------------------- Begin inner2 -----------
              mysql.pool.query(
                `SELECT oi.*, mi.name
                FROM Order_Items oi
                JOIN Menu_Items mi on oi.menu_item_id = mi.menu_item_id
                WHERE oi.order_id = ?`,
                req.params.orderId,
                function (err, result) {
                  if (err) {
                    next(err);
                    return;
                  }
                  if (result.length > 0) {
                    thisOrder.order_items = result;
                  }
                  res.json(thisOrder);
                }
              );
              //--------------------------- End inner2 -----------
            }
          }
        );
        //--------------------------- End inner1 -----------
      } else {
        //If no records returned, send back something indicating that
        res.end(
          JSON.stringify({
            status_code: "100",
            message: "No Records Found",
          })
        );
      }
    }
  );
});

//Inserts new order record given a customer_id
router.post("/", function (req, res) {
  let sqlQuery = "INSERT INTO Orders (customer_id) VALUES (?)";
  let sqlParams = req.body.customer_id;
  let isValid = true; //Could be used for a validation of the parameters

  let returnMsg = {};
  if (isValid) {
    mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
      if (err) {
        returnMsg.status_code = 999;
        returnMsg.message = err.sqlMessage;
        res.json(returnMsg);
      } else {
        returnMsg.order_id = result.insertId;
        res.json(returnMsg);
      }
    });
  } else {
    returnMsg.status_code = 0;
    returnMsg.message = "Invalid data";
  }
});

// Update the provided values for a specific row in the Orders table
router.patch("/", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Orders SET ? WHERE order_id = " + req.body.order_id,
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

// PUT verb used to completely replace an item in the system
router.put("/", function (req, res, next) {
  // 1. Remove all associated Order_Items
  // 2. Insert Order_Items from the req.body
  // 3. Update the Orders record for the summary info (subtotal, tzx, etc.)
  // 4. Return a message indicating if the operation was as success or not
});

// Soft-Delete the orders by setting the isactive flag to 0
router.delete("/:id", function (req, res, next) {
  let sqlQuery = "UPDATE Orders SET isactive = 0 WHERE order_id = ?";
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
