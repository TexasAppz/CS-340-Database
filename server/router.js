// router.js
module.exports = function (app) {
  app.get("/", function (req, res, next) {
    res.status(200).send("YOU'VE REACHED THE BASE URL OF YOUR API");
  });

  app.use("/customers", require("./collections/customers"));
  app.use("/menus", require("./collections/menus"));

  // Catch all
  app.use("*", function (req, res, next) {
    res.status(404).json({ err: "Path" + req.originalUrl + " does not exist" });
  });
};
