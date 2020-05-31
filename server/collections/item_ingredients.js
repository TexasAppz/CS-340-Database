// item_ingredients.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

//Inserts a record into the Item_Ingredients table
router.post("/", function (req, res, next) {
  let sqlQuery = `INSERT INTO Item_Ingredients 
    (menu_item_id, ingredient_id) VALUES (?,?)`;
  let sqlParams = [req.body.menu_item_id, req.body.ingredient_id];
  let isValid = true; //Could be used for a validation of the parameters

  let returnMsg = {};
  if (isValid) {
    mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
      if (err) {
        returnMsg.status_code = 999;
        returnMsg.message = err.sqlMessage;
        res.json(returnMsg);
      } else {
        returnMsg.item_ingredient_id = result.insertId;
        res.json(returnMsg);
      }
    });
  } else {
    returnMsg.status_code = 0;
    returnMsg.message = "Invalid data";
    res.json(returnMsg);
  }
});

// Deletes a record from the Item_Ingredients table
router.delete("/", function (req, res, next) {
  let sqlQuery = "DELETE FROM Item_Ingredients WHERE item_ingredient_id = ?";
  let getData = req.body.item_ingredient_id;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

module.exports = router;
