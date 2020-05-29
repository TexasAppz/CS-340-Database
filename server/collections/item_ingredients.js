// item_ingredients.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// GET /item_ingredients
// Returns all item ingredients
router.get("/", function (req, res, next) {
    let sqlQuery = 
            `SELECT ii.item_ingredient_id, ii.menu_item_id,
            ii.ingredient_id, ing.name
            FROM Item_Ingredients ii
            JOIN Ingredients ing
                ON(ing.ingredient_id = ii.ingredient_id)
            ORDER BY ing.name ASC`;
    mysql.pool.query(sqlQuery, function (err, result) {
        if (err) {
            next(err);
            return;
        }

        res.end(JSON.stringify(result));
    });
});

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
                returnMsg.item_ingredient_id = result.insertId;
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
// delete /item_ingredients/:itemIngredientId
// Deletes a row from the database for the table Item_Ingredients
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

// Patch /item_ingredients/:itemIngredientId
// Update the provided values for a specific row in the Item_Ingredients table
router.patch("/:itemIngredientId", function (req, res, next) {
    mysql.pool.query(
        "UPDATE Item_Ingredients SET ? WHERE item_ingredient_id = " 
        + [req.params.itemIngredientId],
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


module.exports = router;