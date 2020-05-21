// customers.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /customers
// Returns all values from the database for the table Customers
router.get("/", function (req, res, next) {
  let sqlQuery = "SELECT * FROM Customers ORDER BY customer_id";
  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    res.end(JSON.stringify(result));
  });
});

// GET /customers/:id
// Returns all values from the database for the table Customers
router.get("/:customerId", function (req, res, next) {
  let sqlQuery = "SELECT * FROM Customers WHERE customer_id = ?";
  let getData = req.params.customerId;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.end(JSON.stringify(result));
  });
});

// GET /customers/byEmail/:emailAddress
// Returns all values from the database for the table Customers
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
        res.end(JSON.stringify(returnMsg));
      } else {
        returnMsg.customer_id = result.insertId;
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
