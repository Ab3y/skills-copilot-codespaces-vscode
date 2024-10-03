// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Create a route
app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

// Create a route
app.post('/comment', function(req, res) {
    var comment = req.body.comment;
    fs.appendFile('comments.txt', comment + '\n', function(err) {
        if (err) {
            res.send('Error');
        } else {
            res.send('Success');
        }
    });
});

// Create a route
app.get('/comments', function(req, res) {
    fs.readFile('comments.txt', 'utf8', function(err, data) {
        if (err) {
            res.send('Error');
        } else {
            res.send(data);
        }
    });
});

// Start server
app.listen(3000, function() {
    console.log('Server is running on port 3000');
});