var express = require('express');
var mysql   = require('mysql');
var path 		= require('path');
var bodyParser = require('body-parser');

// var articles = require('./routes/articles');
var app = express();

var connection = mysql.createConnection({
  host     : '142.4.0.70',
  user     : 'apps_justin',
  password : '%s^lvRMR7t(1'
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

connection.query('CREATE TABLE IF NOT EXISTS apps_justin.articles('
    + 'id INT NOT NULL AUTO_INCREMENT,'
    + 'PRIMARY KEY(id),'
    + 'title VARCHAR(30),'
    + 'body VARCHAR(300),'
    + 'author VARCHAR(30)'
    +  ')', function (err) {
        if (err) throw err;
    });

app.use(bodyParser.json({extended: true}))

// CRUD

app.post('/articles', function (req, res) {
	console.log(req.body.author);
    // connection.query('INSERT INTO articles SET (?,?,?)', [req.body, 
        // function (err, result) {
        //     if (err) throw err;
        //     res.send('User added to database with ID: ' + result.insertId);
        // }
    // );
});


app.listen(8080, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8080');
});