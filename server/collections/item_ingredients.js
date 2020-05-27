// item_ingredients.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

//Inserts new Item Ingredients
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

//something new
// delete /item_ingredients/:id
// Deletes a row from the database for the table Customers
router.delete("/:itemIngredientId", function (req, res, next) {
    let sqlQuery = "DELETE FROM Item_Ingredients WHERE item_ingredient_id = ?";
    let getData = req.params.itemIngredientId;
    mysql.pool.query(sqlQuery, getData, function (err, result) {
        if (err) {
            next(err);
            return;
        }
        res.end(JSON.stringify(result));
    });
});

module.exports = router;