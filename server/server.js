/*
    Many thanks to fellow OSU Beaver Daniel Schroeder for demonstrating
    a simple pattern for keeping express routes separated.

    https://medium.com/@dschro225/modular-route-handler-files-with-express-router-ee1ec71223e8

*/

let express = require("express");
let bodyParser = require("body-parser");
let cors = require("cors");

let app = express();
app.set("port", 5150);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let router = require("./router")(app);

app.listen(app.get("port"), function () {
  console.log(
    "Express started on port " +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
