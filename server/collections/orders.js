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

// GET /orders/isactive/:act
// Returns all active orders
router.get("/isactive/:act", function (req, res, next) {
  let sqlQuery = "SELECT * FROM Orders WHERE isactive = ? ";
  let getData = req.params.act;
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
  let sqlQuery = `
    SELECT 
      o.*,
      c.name customerName
    FROM Orders o
    join Customers c on o.customer_id = c.customer_id
    WHERE status <> 'Picked up'
    `;
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

        //--------------------------- Begin inner -----------
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

              //--------------------------- Begin inner2 -----------
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
                    res.end(JSON.stringify(thisOrder));
                  }
                }
              );
              //--------------------------- End inner2 -----------
            }
          }
        );
        //--------------------------- End inner -----------
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
  }
});

// delete /orders/:orderid
// Deletes a row from the database for the table Orders
router.delete("/:orderid", function (req, res, next) {
  let sqlQuery = "DELETE FROM Orders WHERE order_id = ?";
  let getData = req.params.orderid;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.end(JSON.stringify(result));
  });
});

// delete /orders/isactive/:act
// Deletes a row from the database for the table Orders for active
router.delete("/isactive/:act", function (req, res, next) {
  let sqlQuery = "DELETE FROM Orders WHERE isactive = ?";
  let getData = req.params.act;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.end(JSON.stringify(result));
  });
});

// Patch /orders/:orderid
// Update the provided values for a specific row in the Orders table
router.patch("/:orderid", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Orders SET ? WHERE order_id = " + [req.params.orderid],
    req.body,
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.end(JSON.stringify(result));
    }
  );
});

// Patch /orders/isactive/:act
// Update the provided values for a specific row in the Orders table for active
router.patch("/isactive/:act", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Orders SET ? WHERE isactive = " + [req.params.act],
    req.body,
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.end(JSON.stringify(result));
    }
  );
});

module.exports = router;
