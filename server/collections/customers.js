// customers.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// Returns all values from the database for the table Customers
router.get("/", function (req, res, next) {
  //let sqlQuery = "SELECT * FROM Customers ORDER BY customer_id";
  let sqlQuery =
    "SELECT customer_id, name, email, password FROM Customers WHERE is_active = 1 ORDER BY customer_id";
  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

// Returns a specific customer by id
router.get("/:customerId", function (req, res, next) {
  let sqlQuery =
    "SELECT customer_id, name, email, password FROM Customers WHERE customer_id = ?";
  let getData = req.params.customerId;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

// Returns a specific customer by email
router.get("/byEmail/:emailAddress", function (req, res, next) {
  let sqlQuery = "SELECT * FROM Customers WHERE email = ?";
  let getData = req.params.emailAddress;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    //If no records returned, send back something indicating that
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.json({
        status_code: "100",
        message: "No Records Found",
      });
    }
  });
});

//Inserts new customer record
router.post("/", function (req, res, next) {
  let sqlQuery = "INSERT INTO Customers (name, email, password) VALUES (?,?,?)";
  let sqlParams = [req.body.name, req.body.email, req.body.password];
  let isValid = true; //Could be used for a validation of the parameters

  let returnMsg = {};
  if (isValid) {
    mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
      if (err) {
        returnMsg.status_code = 999;
        returnMsg.message = err.sqlMessage;
        res.json(returnMsg);
      } else {
        returnMsg.customer_id = result.insertId;
        res.json(returnMsg);
      }
    });
  } else {
    returnMsg.status_code = 0;
    returnMsg.message = "Invalid data";
    res.json(returnMsg);
  }
});

// Patch /customers/:customer_id
// Update the provided values for a specific row in the Customers table
router.patch("/", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Customers SET ? WHERE customer_id = " + req.body.customer_id,
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

// Delete /customers/
// Soft-Delete the customer by setting the isactive flag to 0
router.delete("/", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Customers SET is_active = 0 WHERE customer_id = ?",
    req.body.customer_id,
    function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.json(result);
    }
  );
});

module.exports = router;
