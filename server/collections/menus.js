// menus.js
let express = require("express");
let router = express.Router();
let mysql = require("../dbcon.js");

// Returns all values from the database for the table Menus
router.get("/", function (req, res, next) {
  let sqlQuery = "SELECT * FROM Menus order by menu_id";
  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

// Used for the navigation drop down menu
router.get("/nav", function (req, res, next) {
  let sqlQuery = `
    SELECT distinct m.*
    FROM Menus m
    join Menu_Items mi on m.menu_id = mi.menu_id;`;
  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});

//Gets all of the data for a given menu
router.get("/:id", function (req, res, next) {
  let sqlQuery = `
    SELECT 
      m.menu_id, 
      m.name menu_name, 
      mi.menu_item_id, 
      mi.name menu_item_name, 
      mi.price,
      i.ingredient_id, 
      i.name ingredient_name 
    FROM 
      Menus m 
      JOIN Menu_Items mi on m.menu_id = mi.menu_id 
      left outer JOIN Item_Ingredients ii on mi.menu_item_id = ii.menu_item_id 
      left outer JOIN Ingredients i on ii.ingredient_id = i.ingredient_id 
    WHERE mi.is_active = 1 and
      m.menu_id = ? 
    `;

  let sqlParams = req.params.id;
  mysql.pool.query(sqlQuery, sqlParams, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    // Create a menu object
    let menu = {
      menu_id: result[0].menu_id,
      name: result[0].menu_name,
      items: [],
    };

    // Add the menu items
    let menuItemSet = new Set();
    for (let i = 0; i < result.length; ++i) {
      //Create a new menu item
      let obj = {
        menu_item_id: result[i].menu_item_id,
        name: result[i].menu_item_name,
        price: result[i].price,
        ingredients: [],
      };

      // Check to see if this menu item already exists
      // in a set of menu items
      if (!menuItemSet.has(JSON.stringify(obj))) {
        // Add this menu item to the set
        menuItemSet.add(JSON.stringify(obj));

        // Add the menu item to the menu
        menu.items.push(obj);
      }
    }

    //Add the ingredients for each menu item
    for (let i = 0; i < result.length; ++i) {
      //Create an ingredient object
      let obj = {
        ingredient_id: result[i].ingredient_id,
        name: result[i].ingredient_name,
      };

      //Find the menu item it belongs to
      let menuItem = menu.items.find(function (element) {
        return element.menu_item_id == result[i].menu_item_id;
      });

      //add the ingredient to the menu item
      if (obj.ingredient_id !== null) {
        menuItem.ingredients.push(obj);
      }
    }

    // Return the whole menu
    res.json(menu);
  });
});

//Gets all of the data for a given menu
router.get("/search/:phrase", function (req, res, next) {
  let sqlQuery =
    `
    SELECT 
      m.menu_id, 
      m.name menu_name, 
      mi.menu_item_id, 
      mi.name menu_item_name, 
      mi.price,
      i.ingredient_id, 
      i.name ingredient_name 
    FROM 
      Menus m 
      JOIN Menu_Items mi on m.menu_id = mi.menu_id 
      left outer JOIN Item_Ingredients ii on mi.menu_item_id = ii.menu_item_id 
      left outer JOIN Ingredients i on ii.ingredient_id = i.ingredient_id 
      WHERE mi.is_active = 1 and
      mi.name like '%` +
    req.params.phrase +
    `%' or i.name like '%` +
    req.params.phrase +
    `%'
    `;

  mysql.pool.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    // Create a menu object
    let menu = {
      menu_id: 0,
      name: "Search",
      items: [],
    };

    // Add the menu items
    let menuItemSet = new Set();
    for (let i = 0; i < result.length; ++i) {
      //Create a new menu item
      let obj = {
        menu_item_id: result[i].menu_item_id,
        name: result[i].menu_item_name,
        price: result[i].price,
        ingredients: [],
      };

      // Check to see if this menu item already exists
      // in a set of menu items
      if (!menuItemSet.has(JSON.stringify(obj))) {
        // Add this menu item to the set
        menuItemSet.add(JSON.stringify(obj));

        // Add the menu item to the menu
        menu.items.push(obj);
      }
    }

    //Add the ingredients for each menu item
    for (let i = 0; i < result.length; ++i) {
      //Create an ingredient object
      let obj = {
        ingredient_id: result[i].ingredient_id,
        name: result[i].ingredient_name,
      };

      //Find the menu item it belongs to
      let menuItem = menu.items.find(function (element) {
        return element.menu_item_id == result[i].menu_item_id;
      });

      //add the ingredient to the menu item
      if (obj.ingredient_id !== null) {
        menuItem.ingredients.push(obj);
      }
    }

    // Return the whole menu
    res.json(menu);
  });
});

//Inserts new menu record
router.post("/", function (req, res, next) {
  let sqlQuery = "INSERT INTO Menus (name) VALUES (?)";
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
        returnMsg.menu_id = result.insertId;
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
    "UPDATE Menus SET ? WHERE menu_id = " + req.body.menu_id,
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
  let sqlQuery = "DELETE FROM Menus WHERE menu_id = ?";
  let getData = req.params.id;
  mysql.pool.query(sqlQuery, getData, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.json(result);
  });
});
module.exports = router;
