//Require Express
var express = require("express");
//Set router to express router function
var router = express.Router();
//Import the model
var burger = require("../models/burger.js");
//Create the routes
//Route for all the burgers
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
//Route to add a burger
router.post("/", function(req, res){
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function(){
    //reditects back to the list of burgers after adding(sort of a page refresh)
    res.redirect("/");
  });
});
//Route for chnaging to devoured
router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("Current State: ", condition);
    burger.update({
      devoured: req.body.devoured
    }, condition, function() {
      res.redirect("/");
    });
  });
  router.delete("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    burger.delete(condition, function() {
      res.redirect("/");
    });
  });
//Export the routes
module.exports = router;