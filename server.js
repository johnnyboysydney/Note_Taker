//dependencies
var express = require("express");

//init express as app
var app = express();

//set port
var PORT = process.env.PORT || 9000;

//config data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routing
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//alow access to public folder from front end
app.use(express.static('public'));

//listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});