//Ingredients
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /ingredients
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

    res.end(JSON.stringify(result));
  });
});

// GET /ingredients/:ingredientId
// Select a specific ingredient given a ingredients id
router.get("/:ingredientId", function (req, res, next) {
  let sqlQuery = `SELECT ingredient_id, name
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

// GET /ingredients/:ingredientId
// Select a specific ingredient given a ingredients id
router.get("/menu_item/:menuItemId", function (req, res, next) {
  let sqlQuery = `SELECT ingredient_id, name
    FROM Ingredients
    WHERE menu_item_id = ?
    ORDER BY name ASC`;
  let getData = req.params.menuItemId;
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

//Inserts new Ingredients record
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
        returnMsg.ingredient_id = result.insertId;
        res.end(JSON.stringify(returnMsg));
      }
    });
  } else {
    returnMsg.status_code = 0;
    returnMsg.message = "Invalid data";
    res.end(JSON.stringify(returnMsg));
  }
});

// delete /ingredients/:id
// Deletes a row from the database for the table Customers
router.delete("/:ingredientid", function (req, res, next) {
  let sqlQuery = "DELETE FROM Ingredients WHERE ingredientid = ?";
  let getData = req.params.ingredientid;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.end(JSON.stringify(result));
  });
});

// Patch /ingredients/:ingredientid
// Update the provided values for a specific row in the Menu table
router.patch("/:ingredientid", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Ingredients SET ? WHERE menu_id = " + [req.params.ingredientid],
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

//Required to work!!!!!
module.exports = router;
