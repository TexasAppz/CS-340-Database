//Ingredients
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /ingredients
// Returns all values from the database for the table Menus
router.get("/", function (req, res, next) {
  let sqlQuery = `
    select ingredient_id, name
    from Ingredients
    order by name
    `;

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

//Required to work!!!!!
module.exports = router;
