let path = require('path');
let dir = path.join(__dirname, 'views');
const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var alert = require('alert-node');
const Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
const jwt = require('jsonwebtoken');



app.use(express.static(dir));
app.use(express.static(__dirname + '/'));



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




/* Mysql Configuration---*/
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'practice',
	password: 'practice',
	database: 'trello'
});
connection.connect(function (err) {
	if (!err) {
		console.log('Database is connected');
	} else {
		console.log('Error while connecting with database');
	}
});
module.exports = connection;

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-End=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-*/

/*RestFull API for POST request*/


/* Sign up */

app.post('/signup', (req, res) => {
	let today = new Date();
	const encryptedString = cryptr.encrypt(req.body.password);
	let sql = `insert into users(user_name, email, password, created_at, updated_at) values ?`;
	let values = [[req.body.user_name, req.body.email, encryptedString, today, today]];

	connection.query(sql, [values], function (err, result) {
		if (err) {
			res.json({ error: true, message: 'Query Failed!' });
		} else {
			// console.log("Number of records inserted: " + result.affectedRows);

			alert('Account has Successfully Created !');
			return res.redirect('/login.html');
		}
	});
});

/* User Authentication (Login) */

app.post('/authentication', (req, res) => {
	let email = req.body.email;
	let password = req.body.password;

	let sql = `select *from users where email = ?`;

	let values = [[email]];

	connection.query(sql, [values], function (err, result) {
		if (err) throw err;

		if (result.length > 0) {
			decryptedString = cryptr.decrypt(result[0].password);
			if (password == decryptedString) {
				console.log('user is logged: ' + result.affectedRows);

				// jwt.sign({ user_email:req.body.email }, 'secretkey', { expiresIn: "1h" }, (err, token) => {
				jwt.sign({result}, 'secretkey', { expiresIn: "1h" }, (err, token) => {
					console.log('token = ' + token);
					res.cookie('Auth-Token', token);

				});
				alert('User Successfully Login !');
				return res.redirect('/boards.html');
			} else {
			}
		}
	});
});

/* Create Boards */
app.post('/boards', (req, res) => {
	let sql = `insert into boards (board_name) values (?)`;
	let boardname = req.body.board_name;

	connection.query(sql, boardname, function (err, result) {
		if (err) {
			console.log(err);
			res.json({ error: true, message: 'Query Failed!' });
		} else {
			console.log('Number of records inserted: ' + result.affectedRows);
			alert('Board has Successfully Added !');
			return res.redirect('/boards.html');
		}
	});
});

/* Create Lists */

app.post('/lists', (req, res) => {
	let sql = `insert into lists (list_name) values (?);`;
	let listname = req.body.list_name;

	connection.query(sql, listname, function (err, result) {
		if (err) {
			console.log(err);
			res.json({ error: true, message: 'Query Failed!' });
		} else {
			console.log('Number of records inserted: ' + result.affectedRows);

			// res.json({error: false, message : "Board has been Added!"});
			alert('List has been Created !');
			return res.redirect('/board.html');
		}
	});
});

/* Create Cards */

app.post('/cards', (req, res) => {
	let sql = `insert into cards (card_name) values (?);`;
	let cardname = req.body.card_name;

	connection.query(sql, cardname, function (err, result) {
		if (err) {
			console.log(err);
			res.json({ error: true, message: 'Query Failed!' });
		} else {
			console.log('Number of records inserted: ' + result.affectedRows);

			// res.json({error: false, message : "Board has been Added!"});
			alert('card has been Created !');

			return res.redirect('/board.html');
		}
	});
});

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-End=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=*/


/*RestFull API for GET request*/


/* Get Boards */

app.get('/boards/list', (req, res) => {
	connection.query('SELECT * FROM boards', function (err, result) {
		if (err) throw err;
		res.status(200).send({ success: true, results: result });
	});
});



/* Get Lists */

app.get('/lists/list', (req, res) => {
	connection.query('SELECT * FROM lists', function (err, result) {
		if (err) throw err;
		res.status(200).send({ success: true, results: result });
	});
});

/* Get Cards */

app.get('/cards/card', (req, res) => {
	connection.query('SELECT * FROM cards', function (err, result) {
		if (err) throw err;
		res.status(200).send({ success: true, results: result });
	});
});



/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-End=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

app.listen(5000, () => {
	console.log('server is running on port localhost:5000');
});