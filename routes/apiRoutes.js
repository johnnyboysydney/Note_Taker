//dependencies
let db = require("../db/db.json");
const fs = require('fs');

//functions
//re-index data array
function reindexDB(dbArray){
  let newDB = [];
  for (let i = 0; i < dbArray.length; i++) {
    let reIndexedNote = dbArray[i];
    reIndexedNote.id = i + 1;
    newDB[i] = reIndexedNote;
  }
  return newDB;
}
//save data array to db.json
function writeDB(dbArray){
  fs.writeFile('./db/db.json', JSON.stringify(dbArray), function (err) {
    if (err) throw err;
  });
}

//routing
module.exports = function(app) {
  // API GET request route
  app.get("/api/notes", function(req, res) {
    res.json(db);
  });

  //API POST request route
  app.post("/api/notes", function(req, res) {
    //newNote from request
    const newNote = req.body;
    //add new note to db array
    db.push(newNote);
    //rewrite db array with new sequential indexes
    db = reindexDB(db);
    //save db array to json file
    writeDB(db);
    //respond with new note
    res.json(newNote);
  });

  //API DELETE request route
  app.delete("/api/notes/:id", function(req, res) {
    //deleted note id from request
    const deletedNoteID = req.params.id;
    //remove note from db array and return to new array
    const deletedNote = db.splice(deletedNoteID-1, 1);
    //rewrite db array with new indexes
    db = reindexDB(db);
    //write newDB array to disk
    writeDB(db);
    //send response with deleted note
    res.json(deletedNote);
  });
};