var mongo = require('mongodb');
  
var Server = mongo.Server,
Db = mongo.Db,
BSON = mongo.BSONPure;
  
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('notesdb', server);
  
db.open(function(err, db) {
if(!err) {
console.log("Connected to 'notesdb' database");
db.collection('notes', {safe:true}, function(err, collection) {
if (err) {
console.log("The 'notes' collection doesn't exist. ");
}
});
}
});
   
 
exports.findAll = function(req, res) {
var uId = parseInt(req.params.id);
console.log('Retrieving : notes for user id' + uId);


    db.collection('notes', function(err, collection) {
        collection.find({userId:uId}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addNote = function(req, res) {
var note = req.body;
console.log('Adding note: ' + JSON.stringify(note));
db.collection('notes', function(err, collection) {
collection.insert(note, {safe:true}, function(err, result) {
if (err) {
res.send({'error':'An error has occurred'});
} else {
console.log('Success: ' + JSON.stringify(result[0]));
res.send(result[0]);
}
});
});
}
