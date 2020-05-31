// menu_items.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// Returns all active menu items
router.get("/", function (req, res, next) {
  let sqlQuery = `
    SELECT 
      mi.menu_item_id, 
      mi.name, 
      m.name as menu_name, 
      m.menu_id,
      mi.price
    FROM Menu_Items mi
    left outer JOIN Menus m ON (m.menu_id = mi.menu_id)
    WHERE mi.is_active = 1
    ORDER BY m.name, mi.name`;

  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

// Create a new menu item given a new name, price, and a menu id to associate if applicable.
router.post("/", function (req, res, next) {
  let sqlQuery = `
    INSERT INTO Menu_Items (menu_id, name, price) VALUES (?,?,?)`;
  let sqlParams = [req.body.menu_id || null, req.body.name, req.body.price];
  let isValid = true; //Could be used for a validation of the parameters

  let returnMsg = {};
  if (isValid) {
    mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
      if (err) {
        returnMsg.status_code = 999;
        returnMsg.message = err.sqlMessage;
        res.json(returnMsg);
      } else {
        returnMsg.menu_item_id = result.insertId;
        res.json(returnMsg);
      }
    });
  } else {
    returnMsg.status_code = 0;
    returnMsg.message = "Invalid data";
    res.json(returnMsg);
  }
});

// Update the provided values for a specific row in the Menu_Items table
router.patch("/", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Menu_Items SET ? WHERE menu_item_id = " + req.body.menu_item_id,
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

// Soft-Delete the menu_items by setting the isactive flag to 0
router.delete("/", function (req, res, next) {
  mysql.pool.query(
    "UPDATE Menu_Items SET is_active = 0 WHERE menu_item_id = ?",
    req.body.menu_item_id,
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
