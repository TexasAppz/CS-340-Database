//Ingredients
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// Returns all values from the database for the table Menus
router.get("/", function (req, res, next) {
  let sqlQuery = `SELECT *
    FROM Ingredients
    ORDER BY name`;

  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

// Select a specific ingredient given a ingredients id
router.get("/menu_item/:menuItemId", function (req, res, next) {
  let sqlQuery = `
  SELECT i.ingredient_id, i.name
  FROM Ingredients i
  join Item_Ingredients ii on i.ingredient_id = ii.ingredient_id
  WHERE ii.menu_item_id = ?`;
  let getData = req.params.menuItemId;
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

//Inserts new Ingredients record
router.post("/", function (req, res, next) {
  let sqlQuery = "INSERT INTO Ingredients (name) VALUES (?)";
  let sqlParams = req.body.name;
  let isValid = true; //Could be used for a validation of the parameters

  let returnMsg = {};
  if (isValid) {
    mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
      if (err) {
        returnMsg.status_code = 999;
        returnMsg.message = err.sqlMessage;
        res.json(returnMsg);
      } else {
        returnMsg.ingredient_id = result.insertId;
        res.json(returnMsg);
      }
    });
  } else {
    returnMsg.status_code = 0;
    returnMsg.message = "Invalid data";
    res.json(returnMsg);
  }
});

// Update the provided values for a specific row in the Menu table
router.patch("/", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Ingredients SET ? WHERE ingredient_id = " + req.body.ingredient_id,
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

// Deletes a row from the database for the table Customers
router.delete("/:id", function (req, res, next) {
  let sqlQuery = "DELETE FROM Ingredients WHERE ingredient_id = ?";
  let getData = req.params.id;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

//Required to work!!!!!
module.exports = router;
