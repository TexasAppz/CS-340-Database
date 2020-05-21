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

//Required to work!!!!!
module.exports = router;
