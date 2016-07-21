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

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));


app.use(bodyParser.json({extended: true}))
var router = express.Router();

app.use('/', router);

router.get('/articles', function(req, res) {
    connection.query('SELECT * FROM apps_justin.articles;', function (err, rows, fields) {
      if (err) throw err;
      console.log(rows);
      res.send(rows);
    });
});

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
            res.send(results);
        }
    );
});

router.delete('/articles/:articleID', function(req, res) {
	const articleID = req.params.articleID;
	console.log(req.params);
	connection.query('DELETE FROM `apps_justin`.`articles` WHERE `articleID`='+articleID+'', 
        function (err, results) {
            if (err) throw err;
            res.send(results);
        }
    );
});


app.listen(port);
console.log('Listening at http://localhost:'+port);
