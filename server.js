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

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

// connection.query('CREATE TABLE IF NOT EXISTS apps_justin.articles('
//     + 'id INT NOT NULL AUTO_INCREMENT,'
//     + 'PRIMARY KEY(id),'
//     + 'title VARCHAR(30),'
//     + 'body VARCHAR(300),'
//     + 'author VARCHAR(30)'
//     +  ')', function (err) {
//         if (err) throw err;
//     });

app.use(bodyParser.json({extended: true}))
var router = express.Router();


router.get('/articles', function(req, res) {
    connection.query('SELECT * FROM apps_justin.articles;', function (err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.send(rows);
    });
});

app.use('/', router);

router.post('/articles', function (req, res) {
  const title = req.body.title;
  const body = req.body.content;
  const author = req.body.author;
  const post = {
    title,
    body,
    author
  }
    connection.query('INSERT INTO apps_justin.articles SET ?', post, 
        function (err, results) {
            if (err) throw err;
            console.log(results);
            res.send(rows);
        }
    );
});


app.listen(port);
console.log('Listening at http://localhost:'+port);
