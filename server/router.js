// router.js
module.exports = function (app) {
  app.get("/", function (req, res, next) {
    res.status(200).send("YOU'VE REACHED THE BASE URL OF YOUR API");
  });

  app.use("/customers", require("./collections/customers"));
  app.use("/menus", require("./collections/menus"));
  app.use("/ingredients", require("./collections/ingredients"));
  app.use("/orders", require("./collections/orders"));
  app.use("/order_items", require("./collections/order_items"));
  app.use("/menu_items", require("./collections/menu_items"));

  // Catch all
  app.use("*", function (req, res, next) {
    res.status(404).json({ err: "Path" + req.originalUrl + " does not exist" });
  });
};
