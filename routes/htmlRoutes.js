//dependencies
const path = require("path");

//routing
module.exports = function(app) {
  // HTML get request routes
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
};