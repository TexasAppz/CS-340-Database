// menus.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /menus
// Returns all values from the database for the table Menus
router.get("/", function (req, res, next) {
  let sqlQuery = "SELECT * FROM Menus order by menu_id";
  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    res.end(JSON.stringify(result));
  });
});
module.exports = router;
