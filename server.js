//require express
var express = require("express");
//require body-parser
var bodyParser = require("body-parser");
//require method-override to allow for HTTP verbs such as PUT or DELETE
var methodOverride = require("method-override");
//set port to 8080 but allow for others in case it is unavailable
var PORT = process.env.PORT || 8080;
//Set espress to a variable
var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));
//Parse application url
app.use(bodyParser.urlencoded({ extended: false }));
//Method-Override
app.use(methodOverride("_method"));
// parse json
app.use(bodyParser.json());
//Reequire Handlebars and set it an forget it like a Ronnco flavorwave
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
//Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");
app.use(routes);
// Start the server listening to the client requests.
app.listen(PORT, function() {
//Console Log (server-side) when our server has started
console.log("Server listening on: http://localhost:" + PORT);
});