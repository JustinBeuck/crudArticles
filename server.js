var express    = require('express');
var mysql      = require('mysql');
var path 		   = require('path');
var bodyParser = require('body-parser');
var router     = express.Router();
var app        = express();
var port       = process.env.PORT || 8080;

var connection = mysql.createConnection({
  host     : '142.4.0.70',
  user     : 'apps_justin',
  password : '%s^lvRMR7t(1'
});


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({extended: true}))
app.use('/', router);

// CRUD Routes
router.get('/articles', function(req, res) {
    connection.query('SELECT * FROM apps_justin.articles ORDER BY articleID DESC;', function (err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    });
});

router.get('/articles/:articleID', function(req, res) {
    const articleID = req.params.articleID;

    connection.query('SELECT * FROM apps_justin.articles WHERE `articleID`='+articleID+'', function (err, rows, fields) {
      if (err) throw err;
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

	connection.query('DELETE FROM `apps_justin`.`articles` WHERE `articleID`='+articleID+'', 
        function (err, results) {
            if (err) throw err;
            res.send(results);
        }
    );
});

router.put('/articles/:articleID', function(req, res) {
  const articleID = req.params.articleID;
  const title = req.body.title;
  const body = req.body.content;
  const author = req.body.author;

  const putUpdate = {
    title,
    body,
    author
  }

  connection.query('UPDATE `apps_justin`.`articles` SET ? WHERE `articleID`='+articleID+'', putUpdate,
        function (err, results) {
            if (err) throw err;
            res.send(results);
        }
    );
});


app.listen(port);
console.log('Listening on port '+port);
