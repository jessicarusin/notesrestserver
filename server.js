var express = require('express'),
    notes = require('./routes/notes');
 
var app = express();

app.configure(function () {
app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
app.use(express.bodyParser());
}); 

app.get('/notes/:id', notes.findAll);
app.post('/notes', notes.addNote);
app.listen(3000);
console.log('Listening on port 3000...');
