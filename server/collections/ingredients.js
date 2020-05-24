//Ingredients
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /ingredients
// Returns all values from the database for the table Menus
router.get("/", function (req, res, next) {
  let sqlQuery = 
    `SELECT *
    FROM Ingredients
    ORDER BY name`;

  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    res.end(JSON.stringify(result));
  });
});

// GET /ingredients/:ingredientId
// Select a specific ingredient given a ingredients id
router.get("/:ingredientId", function (req, res, next) {
  let sqlQuery = 
    `SELECT ingredient_id, name
      FROM Ingredients
      WHERE ingredient_id = ?
      ORDER BY name ASC`;
  let getData = req.params.ingredientId;
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


// POST /ingredients/
// Add New Menu Form: Create a new ingredient given a new name
router.post("/", function (req, res, next) {
  let sqlQuery = "INSERT INTO Ingredients (name) VALUES (?)";
  let sqlParams = [req.body.name];
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

//Required to work!!!!!
module.exports = router;
